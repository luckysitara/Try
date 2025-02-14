"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    console.log(formData)
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    })
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  )
}

