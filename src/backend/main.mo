import Map "mo:core/Map";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type PartnerRegistration = {
    name : Text;
    companyName : Text;
    phone : Text;
    email : Text;
    city : Text;
    businessType : Text;
    timestamp : Time.Time;
  };

  type ContactForm = {
    name : Text;
    email : Text;
    phone : Text;
    subject : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type NewsletterSubscription = {
    email : Text;
    timestamp : Time.Time;
  };

  module ContactForm {
    public func compare(a : ContactForm, b : ContactForm) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  module PartnerRegistration {
    public func compare(a : PartnerRegistration, b : PartnerRegistration) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  module NewsletterSubscription {
    public func compare(a : NewsletterSubscription, b : NewsletterSubscription) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let partnerRegistrations = Map.empty<Text, PartnerRegistration>();
  let contactForms = Map.empty<Text, ContactForm>();
  let newsletterSubscriptions = Map.empty<Text, NewsletterSubscription>();

  public shared ({ caller }) func submitPartnerRegistration(name : Text, companyName : Text, phone : Text, email : Text, city : Text, businessType : Text) : async () {
    let timestamp = Time.now();
    let entry : PartnerRegistration = {
      name;
      companyName;
      phone;
      email;
      city;
      businessType;
      timestamp;
    };
    partnerRegistrations.add(timestamp.toText(), entry);
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, subject : Text, message : Text) : async () {
    let timestamp = Time.now();
    let entry : ContactForm = {
      name;
      email;
      phone;
      subject;
      message;
      timestamp;
    };
    contactForms.add(timestamp.toText(), entry);
  };

  public shared ({ caller }) func subscribeNewsletter(email : Text) : async () {
    let timestamp = Time.now();
    let entry : NewsletterSubscription = {
      email;
      timestamp;
    };
    if (newsletterSubscriptions.containsKey(email)) {
      Runtime.trap("Email already subscribed");
    };
    newsletterSubscriptions.add(email, entry);
  };

  public query ({ caller }) func getAllPartnerRegistrations() : async [PartnerRegistration] {
    partnerRegistrations.values().toArray().sort();
  };

  public query ({ caller }) func getAllContactForms() : async [ContactForm] {
    contactForms.values().toArray().sort();
  };

  public query ({ caller }) func getAllNewsletterSubscriptions() : async [NewsletterSubscription] {
    newsletterSubscriptions.values().toArray().sort();
  };
};
