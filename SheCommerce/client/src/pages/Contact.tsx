import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { useLocation } from 'wouter'; // ✅ added for navigation

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();
  const [, setLocation] = useLocation(); // ✅ hook for navigation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    toast({
      title: 'Message Sent!',
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ New handler for navigating to Live Chat page
  const handleLiveChat = () => {
    setLocation('/live-chat');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
              data-testid="text-contact-title"
            >
              Get in Touch
            </h1>
            <p
              className="text-lg text-muted-foreground"
              data-testid="text-contact-description"
            >
              Have questions? We're here to help and would love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="p-6 hover-elevate transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-foreground mb-1"
                        data-testid="text-email-title"
                      >
                        Email Us
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        support@empowermarket.com
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover-elevate transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-foreground mb-1"
                        data-testid="text-phone-title"
                      >
                        Call Us
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover-elevate transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-foreground mb-1"
                        data-testid="text-location-title"
                      >
                        Visit Us
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        123 Market Street
                        <br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                </Card>

                {/* ✅ Live Chat Card */}
                <Card className="p-6 bg-primary">
                  <div className="flex items-center gap-3 text-primary-foreground">
                    <MessageCircle className="h-6 w-6" />
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        data-testid="text-chat-title"
                      >
                        Live Chat
                      </h3>
                      <p className="text-sm text-primary-foreground/90">
                        Available Mon-Fri, 9am-6pm PT
                      </p>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-white text-primary hover:bg-white/90"
                    onClick={handleLiveChat} // ✅ added navigation
                    data-testid="button-start-chat"
                  >
                    💬 Start Chat
                  </Button>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <h2
                    className="text-2xl font-serif font-semibold text-foreground mb-6"
                    data-testid="text-form-title"
                  >
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          data-testid="input-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          data-testid="input-contact-email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                        data-testid="input-subject"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                        data-testid="textarea-message"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto"
                      data-testid="button-send-message"
                    >
                      Send Message
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
