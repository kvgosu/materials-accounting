# tests/functional/test_debt_calculations.py
from datetime import date, datetime, timedelta
import uuid

from app.database.models import (
    InvoiceStatus, TransactionType, 
    DebtDirection, DebtDimension
)
from app.database.repositories import (
    InvoiceRepository, 
    TransactionRepository,
    DebtMovementRepository
)
from app.services.debt_service import DebtService


def test_debt_balance_calculation(db_session, processed_invoice):
    debt_service = DebtService(db_session)
    invoice_repo = InvoiceRepository(db_session)
    invoice = invoice_repo.get_with_items(processed_invoice.id)
    assert invoice is not None
    client_debt = debt_service.get_client_debt(invoice.client_id)
    assert round(client_debt, 2) == round(invoice.total_with_markup, 2)
    supplier_debt = debt_service.get_supplier_debt(invoice.supplier_id)
    assert round(supplier_debt, 2) == round(invoice.total_amount, 2)

def test_debt_turnover_calculation(db_session, processed_invoice):
    debt_repo = DebtMovementRepository(db_session)
    transaction_repo = TransactionRepository(db_session)
    today = date.today()
    month_start = date(today.year, today.month, 1)
    next_month = today.replace(day=28) + timedelta(days=4)
    month_end = next_month.replace(day=1) - timedelta(days=1)
    client_debt_amount = processed_invoice.total_with_markup
    supplier_debt_amount = processed_invoice.total_amount
    client_turnovers = debt_repo.get_turnovers(
        client_id=processed_invoice.client_id,
        dimension=DebtDimension.CLIENT_DEBT,
        start_date=datetime.combine(month_start, datetime.min.time()),
        end_date=datetime.combine(month_end, datetime.max.time())
    )
    assert len(client_turnovers) == 1
    assert client_turnovers[0]['client_id'] == processed_invoice.client_id
    assert client_turnovers[0]['dimension'] == DebtDimension.CLIENT_DEBT
    assert round(client_turnovers[0]['debit'], 2) == round(client_debt_amount, 2)
    assert round(client_turnovers[0]['credit'], 2) == 0.0
    supplier_turnovers = debt_repo.get_turnovers(
        supplier_id=processed_invoice.supplier_id,
        dimension=DebtDimension.SUPPLIER_DEBT,
        start_date=datetime.combine(month_start, datetime.min.time()),
        end_date=datetime.combine(month_end, datetime.max.time())
    )
    assert len(supplier_turnovers) == 1
    assert supplier_turnovers[0]['supplier_id'] == processed_invoice.supplier_id
    assert supplier_turnovers[0]['dimension'] == DebtDimension.SUPPLIER_DEBT
    assert round(supplier_turnovers[0]['debit'], 2) == round(supplier_debt_amount, 2)
    assert round(supplier_turnovers[0]['credit'], 2) == 0.0
    payment_amount = client_debt_amount / 2
    transaction_repo.register_client_payment(
        client_id=processed_invoice.client_id,
        amount=payment_amount,
        date_obj=today,
        description="Частичная оплата"
    )
    updated_client_turnovers = debt_repo.get_turnovers(
        client_id=processed_invoice.client_id,
        dimension=DebtDimension.CLIENT_DEBT,
        start_date=datetime.combine(month_start, datetime.min.time()),
        end_date=datetime.combine(month_end, datetime.max.time())
    )
    assert len(updated_client_turnovers) == 1
    assert updated_client_turnovers[0]['client_id'] == processed_invoice.client_id
    assert updated_client_turnovers[0]['dimension'] == DebtDimension.CLIENT_DEBT
    assert round(updated_client_turnovers[0]['debit'], 2) == round(client_debt_amount, 2)
    assert round(updated_client_turnovers[0]['credit'], 2) == round(payment_amount, 2)

def test_debt_report_generation(db_session, processed_invoice):
    debt_service = DebtService(db_session)
    transaction_repo = TransactionRepository(db_session)
    payment_amount = processed_invoice.total_with_markup / 2
    transaction_repo.register_client_payment(
        client_id=processed_invoice.client_id,
        amount=payment_amount,
        date_obj=date.today(),
        description="Тестовая оплата для отчета"
    )
    today = date.today()
    month_start = date(today.year, today.month, 1)
    next_month = today.replace(day=28) + timedelta(days=4)
    month_end = next_month.replace(day=1) - timedelta(days=1)
    client_report = debt_service.get_debt_report(
        client_id=processed_invoice.client_id,
        dimension=DebtDimension.CLIENT_DEBT,
        start_date=datetime.combine(month_start, datetime.min.time()),
        end_date=datetime.combine(today, datetime.max.time())
    )
    assert 'startDate' in client_report
    assert 'endDate' in client_report
    assert 'beginningBalances' in client_report
    assert 'endingBalances' in client_report
    assert 'turnovers' in client_report
    assert len(client_report['beginningBalances']) <= 1  
    assert len(client_report['endingBalances']) == 1
    assert len(client_report['turnovers']) == 1
    turnover = client_report['turnovers'][0]
    assert turnover['client_id'] == processed_invoice.client_id
    assert turnover['dimension'] == DebtDimension.CLIENT_DEBT
    assert round(turnover['debit'], 2) == round(processed_invoice.total_with_markup, 2)
    assert round(turnover['credit'], 2) == round(payment_amount, 2)
    ending_balance = client_report['endingBalances'][0]
    assert ending_balance['client_id'] == processed_invoice.client_id
    assert ending_balance['dimension'] == DebtDimension.CLIENT_DEBT
    assert round(ending_balance['balance'], 2) == round(processed_invoice.total_with_markup - payment_amount, 2)


def test_multiple_invoices_debt_calculation(db_session, sample_client, sample_supplier, sample_contract, sample_materials):
    invoice_repo = InvoiceRepository(db_session)
    debt_service = DebtService(db_session)
    invoices = []
    total_client_debt = 0.0
    total_supplier_debt = 0.0
    for i in range(3):
        invoice_data = {
            "number": f"MULTI-TEST-{i+1:03d}",
            "date": date.today() - timedelta(days=i),
            "client_id": sample_client.id,
            "supplier_id": sample_supplier.id,
            "contract_id": sample_contract.id,
            "status": InvoiceStatus.CREATED
        }
        items_data = []
        for j, material in enumerate(sample_materials[:2]):  
            quantity = 10.0 * (i + 1)
            price = 100.0 * (j + 1)
            amount = quantity * price
            amount_with_markup = amount * (1 + sample_contract.markup_percentage / 100)
            items_data.append({
                "material_id": material.id,
                "quantity": quantity,
                "price": price,
                "amount": amount,
                "amount_with_markup": amount_with_markup
            })
            total_client_debt += amount_with_markup
            total_supplier_debt += amount
        invoice = invoice_repo.create(invoice_data, items_data)
        invoice_repo.process_invoice(invoice.id)
        invoices.append(invoice)
    client_debt = debt_service.get_client_debt(sample_client.id)
    supplier_debt = debt_service.get_supplier_debt(sample_supplier.id)
    assert round(client_debt, 2) == round(total_client_debt, 2)
    assert round(supplier_debt, 2) == round(total_supplier_debt, 2)
    transaction_repo = TransactionRepository(db_session)
    first_invoice = invoices[0]
    transaction_repo.register_client_payment(
        client_id=sample_client.id,
        amount=first_invoice.total_with_markup,
        date_obj=date.today(),
        description="Оплата первой накладной"
    )
    updated_client_debt = debt_service.get_client_debt(sample_client.id)
    assert round(updated_client_debt, 2) == round(total_client_debt - first_invoice.total_with_markup, 2)
    expected_remaining_debt = invoices[1].total_with_markup + invoices[2].total_with_markup
    assert round(updated_client_debt, 2) == round(expected_remaining_debt, 2)

def test_total_debts_calculation(db_session, processed_invoice):
    debt_service = DebtService(db_session)
    total_client_debts = debt_service.get_total_client_debts()
    assert round(total_client_debts, 2) == round(processed_invoice.total_with_markup, 2)
    total_supplier_debts = debt_service.get_total_supplier_debts()
    assert round(total_supplier_debts, 2) == round(processed_invoice.total_amount, 2)