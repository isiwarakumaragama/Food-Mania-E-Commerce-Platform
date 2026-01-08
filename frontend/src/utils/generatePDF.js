import jsPDF from 'jspdf';

export const generatePDF = (orderData, orderId) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Header
    doc.setFontSize(24);
    doc.setTextColor(4, 84, 9);
    doc.text('ORDER RECEIPT', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 15;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Order ID: ${orderId}`, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 8;
    doc.text(`Date: ${new Date(orderData.orderDate || Date.now()).toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });

    // Horizontal line
    yPosition += 10;
    doc.setDrawColor(141, 229, 147);
    doc.line(20, yPosition, pageWidth - 20, yPosition);

    // Customer Information
    yPosition += 12;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('CUSTOMER INFORMATION', 20, yPosition);

    yPosition += 8;
    doc.setFontSize(10);
    doc.text(`Name: ${orderData.customerName}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Email: ${orderData.customerEmail}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Phone: ${orderData.customerPhone}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Delivery Address: ${orderData.deliveryAddress}`, 20, yPosition, { maxWidth: pageWidth - 40 });
    
    yPosition += 12;
    
    // Horizontal line
    doc.setDrawColor(141, 229, 147);
    doc.line(20, yPosition, pageWidth - 20, yPosition);

    // Order Items
    yPosition += 10;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('ORDER ITEMS', 20, yPosition);

    yPosition += 8;
    doc.setFontSize(9);
    
    // Table header
    const columnX = { name: 20, quantity: 110, price: 140, total: 170 };
    doc.setTextColor(4, 84, 9);
    doc.text('Product', columnX.name, yPosition);
    doc.text('Qty', columnX.quantity, yPosition);
    doc.text('Price', columnX.price, yPosition);
    doc.text('Total', columnX.total, yPosition);
    
    yPosition += 7;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPosition, pageWidth - 20, yPosition);
    
    yPosition += 6;
    doc.setTextColor(0, 0, 0);

    // Table rows
    orderData.items.forEach((item) => {
        const productText = item.productName.substring(0, 25);
        doc.text(productText, columnX.name, yPosition);
        doc.text(item.quantity.toString(), columnX.quantity, yPosition, { align: 'center' });
        doc.text(`Rs. ${item.price}`, columnX.price, yPosition);
        doc.text(`Rs. ${item.total}`, columnX.total, yPosition);
        yPosition += 6;

        // Check if we need a new page
        if (yPosition > pageHeight - 50) {
            doc.addPage();
            yPosition = 20;
        }
    });

    // Horizontal line before totals
    yPosition += 5;
    doc.setDrawColor(141, 229, 147);
    doc.line(20, yPosition, pageWidth - 20, yPosition);

    // Totals
    yPosition += 10;
    doc.setFontSize(10);
    
    doc.text('Subtotal:', 110, yPosition, { align: 'right' });
    doc.text(`Rs. ${orderData.subtotal}`, pageWidth - 20, yPosition, { align: 'right' });
    
    yPosition += 7;
    doc.text('Delivery Fee:', 110, yPosition, { align: 'right' });
    doc.text('Free', pageWidth - 20, yPosition, { align: 'right' });
    
    yPosition += 7;
    doc.setFontSize(12);
    doc.setTextColor(4, 84, 9);
    doc.text('TOTAL:', 110, yPosition, { align: 'right' });
    doc.text(`Rs. ${orderData.total}`, pageWidth - 20, yPosition, { align: 'right' });

    // Footer
    yPosition += 20;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for your order!', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 6;
    doc.text('Payment Status: ' + (orderData.paymentStatus || 'Completed'), pageWidth / 2, yPosition, { align: 'center' });

    // Generate filename with order ID and date
    const fileName = `Order-${orderId}-${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Download PDF
    doc.save(fileName);
};
