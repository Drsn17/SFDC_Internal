public with sharing class VistorDetailController {
    
    @AuraEnabled(cacheable=true)
    public static List<Visitor_Details__c> getVisitorsDetails(){
        try {
            return [SELECT Id, Name, First_Name__c, Last_Name__c, Adhar_Card_No__c, Visit_Date__c, Status__c FROM Visitor_Details__c WHERE Visit_Date__c = TODAY LIMIT 1000];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Visitor_Details__c updateVisitorRecord(Visitor_Details__c vistorObj){
        try {
            vistorObj.Status__c = 'Approved';
            update vistorObj;
            return vistorObj;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
