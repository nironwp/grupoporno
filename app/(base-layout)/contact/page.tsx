"use client";

import { useToast } from '@/components/ui/use-toast';
import { sendContactMail } from '@/functions/mail';
import { getCookie } from '@/lib/cookies';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import React, { createRef, useState } from 'react';

export default function Home() {
  const hcaptchaRef = createRef<any>();
  const [name, seetName] = useState("")
  const [email, setMail] = useState("")
  const [motivo, setMotivo] = useState("")
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const handleFormSubmit = async (captchaCode: string) => {
    const token = await getCookie("auth:token")

    if(
      captchaCode.length <= 0 ||
      name.length <= 0 ||
      email.length <= 0 ||
      motivo.length <= 0 ||
      message.length <= 0 ||
      token.value.length <= 0 
    ) {
      if(token.value.length <= 0 ) {
        toast({
          variant: "destructive",
          title: "Você precisa estar logado para enviar um formulário de contato",
        });
      }else {
        toast({
          variant: "destructive",
          title: "Preencha todos os campos",
        });
      }
      return
    }
    
    const result = await sendContactMail({
      from: email,
      from_name: name,
      message: message, 
      motivo: motivo,
      recaptcha_token: captchaCode,
      token: token.value
    })

    if(result) {
      return toast({
        variant: "success",
        title: "Contato enviado com sucesso!",
      });
    }else {
      return toast({
        variant: "destructive",
        title: "Houve um erro ao entrar em contato",
      });
    }
  }
  return (
<div className="flex min-h-screen items-center justify-start bg-white">
  <div className="mx-auto w-full max-w-lg">
    <h1 className="text-4xl font-medium">Tem uma ídeia, sugestão ou melhoria?</h1>
    <p className="mt-3">Entre em contato:</p>

    <form action="https://api.web3forms.com/submit" onSubmit={(e) => {
      e.preventDefault()
      hcaptchaRef.current.execute();
    }} className="mt-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="relative z-0">
          <input type="text" onChange={(e) => {
                seetName(e.target.value);
              }} name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Seu Nome</label>
        </div>
        <div className="relative z-0">
          <input onChange={(e) => {
            setMail(e.target.value)
          }} type="text" name="email" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Seu Email</label>
        </div>
        <div className="relative z-0 col-span-2">
          <input onChange={(e) => {
            setMotivo(e.target.value)
          }} type="text" name="motivo" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Motivo do Contato</label>
        </div>
        <div className="relative z-0 col-span-2">
          <textarea onChange={(e) => {
            setMessage(e.target.value)
          }} name="message" rows={5} className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" "></textarea>
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Sua Mensagem</label>
        </div>
      </div>
      <HCaptcha
        id="test"
        size="invisible"
        ref={hcaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
        onVerify={handleFormSubmit}
      />
      <button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">Enviar mensagem</button>
      <a className='block mt-4' href='https://t.me/negotiationman'>Gostaria de ter um site como esse? solicite um orçamento </a>
    </form>
  </div>
</div>
  );
}
