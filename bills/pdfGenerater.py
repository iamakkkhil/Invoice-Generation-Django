from django.http import FileResponse
import io

from reportlab.platypus import SimpleDocTemplate, Table, Paragraph, TableStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape

from reportlab.lib.units import cm
from reportlab.lib.enums import TA_RIGHT, TA_LEFT
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen.canvas import Canvas

from .models import Customer


def invoicePdf(request, id):
    # file = open('catalog.json')
    buffer = io.BytesIO()
    CustomerObj = Customer.objects.get(id=id)
    ItemObj = CustomerObj.purchased_items_obj.all()

    # Accessing Attributes of Customer Model 
    customer_name = CustomerObj.customer_name
    invoice_id = CustomerObj.id
    contact_no = CustomerObj.contact_no
    email = CustomerObj.email
    total_amount = CustomerObj.total_amount

    
    final = [
        [
            'Item/Description', 'Price per unit',  'Quantity', 'Price'
        ],
    ]
    
    for each_item in ItemObj:
        item = each_item.product_name
        price_per_quantity = each_item.product_price
        quantity = each_item.quantity
        total_product_price = price_per_quantity*quantity

        final.append([item, float(price_per_quantity), int(quantity), float(total_product_price)])

    # Total Row
    final.append(['Total', '', '',float(total_amount)],)

    canvas = Canvas(buffer, pagesize = A4)

    canvas.setLineWidth(.3)
    canvas.setFont('Helvetica', 12)
    canvas.drawString(30,750,f'Customer name: {customer_name}', )
    canvas.drawString(30,735,f'Phone: {contact_no}')
    canvas.drawString(30,720,f'Email: {email}')
    canvas.drawString(500,790,f'Invoice: #{invoice_id}')
    canvas.setFont('Helvetica-Bold', 22)
    canvas.drawString(350,747,f'Virtual Company Ltd.')
    canvas.setFont('Helvetica', 10)
    canvas.drawString(475,703, '+91-XXXX-XX-XXXX')
    canvas.drawString(475,693, 'abc@xcompany.com')
    canvas.drawString(482,683, '23th Street, Zbcxyz')
    
    canvas.drawString(245, 200, 'Thanks for Shopping with us!')
    canvas.line(245, 200, 375, 200)

    style = TableStyle(
        [
            ("BOX", (0, 0), (-1, -1), 1 , colors.black),
            ("BOX", (0, 0), (0, -1), 1 , colors.black),
            ("BOX", (1, 0), (1, -1), 1 , colors.black),
            ("BOX", (2, 0), (1, -1), 1 , colors.black),
            ("BOX", (3, 0), (1, -1), 1 , colors.black),
            ("BOX", (0, 0), (-1, 0), 1 , colors.black),
            ("TEXTCOLOR", (0, 0), (-1, 0 ), colors.black),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ('LEFTPADDING', (0, 0), (-1, -1), 15),
            ('RIGHTPADDING', (0, 0), (-1, -1), 15),
            ("BOX", (0, -1), (-1, -1), 1 , colors.black ),
        ]
    )


    x = 31
    y = 375

    width = 1200
    height = 1600
    table = Table(final, style = style, colWidths=134, rowHeights=25)
    table.wrapOn(canvas, width, height)
    table.drawOn(canvas, x, y)


    canvas.save()
    buffer.seek(0)

    return FileResponse(buffer, as_attachment=True, filename=f'{customer_name}-Invoice.pdf')
