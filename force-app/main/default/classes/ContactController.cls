public with sharing class ContactController {
    @AuraEnabled     
    public static List<Contact> fetchFewContacts(){         
        return [SELECT Id, Name, Phone, Email FROM Contact LIMIT 5];     
    }
}