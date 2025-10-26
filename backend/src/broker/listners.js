const { subscribeToQueue } = require("./broker")
const  {sendEmail}  = require("../email")
module.exports=function (){
  subscribeToQueue('AUTH_USER_CREATED',async (data)=>{
    const emailHtmlTemplate=`<h1>Welcome to Our Service</h1>
    <p>Dear ${data.username},</p>
    <p>Thank you for registering with us. We're excited to have you on board!</p>
    <p>Best regards,<br/>The Team</p>
    `
    await sendEmail(data.email,"Welcome to Our Service","Thank you for registering with us",emailHtmlTemplate)
  })
  subscribeToQueue('PRODUCT_CREATED',async(data)=>{
    const emailHtmlTemplate=`<h1>New Product Created</h1>
    <p>Dear Admin,</p>
    <p>A new product has been successfully created in the system.</p>
    <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border: 1px solid #ddd; border-radius: 5px;">
      <p><strong>Product Details:</strong></p>
      <ul style="list-style: none; padding-left: 0;">
        <li><strong>Product Name:</strong> ${data.name}</li>
        <li><strong>Product ID:</strong> ${data.id}</li>
        <li><strong>Description:</strong> ${data.description}</li>
        <li><strong>Price:</strong> $${data.price}</li>
        <li><strong>Created On:</strong> ${new Date().toLocaleDateString()}</li>
      </ul>
    </div>
    <p>You can view the complete product details in the admin dashboard.</p>
    <p>Best regards,<br/>The System</p>`
    if (!data.email) {
      console.error("No recipient email provided for event:", data);
      return;
    }
    await sendEmail(data.email,"Welcome to Our Service","Thank you for joining with us",emailHtmlTemplate)
  })
  subscribeToQueue('ORDER-PLACED',async(order)=>{
    const emailHtmlTemplate=`<div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 24px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #eee; padding: 32px;">
      <h1 style="color: #2d3748;">Thank You for Your Order!</h1>
      <p>Hi ${order.userName || "Customer"},</p>
      <p>Your order <b>#${order.id}</b> has been placed successfully on <b>${new Date(order.createdAt).toLocaleDateString()}</b>.</p>
      <h2 style="margin-top: 24px; color: #4a5568;">Order Summary</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr>
            <th align="left" style="border-bottom: 1px solid #eee; padding: 8px 0;">Product</th>
            <th align="center" style="border-bottom: 1px solid #eee; padding: 8px 0;">Qty</th>
            <th align="right" style="border-bottom: 1px solid #eee; padding: 8px 0;">Price</th>
          </tr>
        </thead>
      </table>
      <div style="text-align: right; margin-bottom: 16px;">
        <strong>Total: $${order.total}</strong>
        <strong>Status: $${order.status}</strong>
      </div>
      <h3 style="color: #4a5568;">Shipping Information</h3>
      <p>
        ${order.shippingInfo.name}<br/>
        ${order.shippingInfo.address}<br/>
        ${order.shippingInfo.city}, ${order.shippingInfo.pincode}<br/>
        Phone: ${order.shippingInfo.phone}
      </p>
      <p style="margin-top: 32px;">We’ll notify you when your order ships.<br/>Thank you for shopping with us!</p>
      <p style="color: #888; font-size: 13px; margin-top: 32px;">If you have any questions, reply to this email or contact our support team.</p>
    </div>
  </div>`
    if (!order.email) {
      console.error("No recipient email provided for event:", data);
      return;
    }
    await sendEmail(order.email,"Welcome to Our Service","Thank you for joining with us",emailHtmlTemplate)
  })
}