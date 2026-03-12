import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PartnerRegistration {
    city: string;
    name: string;
    businessType: string;
    email: string;
    timestamp: Time;
    companyName: string;
    phone: string;
}
export interface NewsletterSubscription {
    email: string;
    timestamp: Time;
}
export type Time = bigint;
export interface ContactForm {
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface backendInterface {
    getAllContactForms(): Promise<Array<ContactForm>>;
    getAllNewsletterSubscriptions(): Promise<Array<NewsletterSubscription>>;
    getAllPartnerRegistrations(): Promise<Array<PartnerRegistration>>;
    submitContactForm(name: string, email: string, phone: string, subject: string, message: string): Promise<void>;
    submitPartnerRegistration(name: string, companyName: string, phone: string, email: string, city: string, businessType: string): Promise<void>;
    subscribeNewsletter(email: string): Promise<void>;
}
