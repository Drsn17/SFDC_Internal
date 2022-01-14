public with sharing class miniProject {
    @AuraEnabled 
    public static List<Account> getAccounts(){
        return [SELECT Id, Name, Phone, Website, Industry FROM Account LIMIT 10];
    }

    @AuraEnabled 
    public static List<Contact> getContacts(){
        return [SELECT Id, Name, Phone, Email FROM Contact LIMIT 10];
    }

    @AuraEnabled 
    public static List<Contact> fetchFewContacts(){
        return [SELECT Id, Name, Phone, Email FROM Contact LIMIT 10];
    }

}