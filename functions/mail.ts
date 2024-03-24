import axios from "axios"


export const sendContactMail =  async ({
    from,
    from_name,
    message,
    motivo,
    recaptcha_token,
    token
}: {
    from: string,
    from_name: string,
    message: string,
    motivo: string,
    recaptcha_token: string,
    token: string
}) => {
    try {
        const mailRequest = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/mail/contact`,
            {
                admin_email:"admin_email",
                admin_email_password:"email_password",
                email:from,
                name:from_name,
                message:message,
                motivo:motivo,
                recaptcha_setting_key:"secret_recaptcha_key",
                recaptcha_token: recaptcha_token
            },
            {
              headers: { Authorization: "Bearer " + token },
            }
        )
        return mailRequest.data
    } catch (error: any) {
        return false
    }
}