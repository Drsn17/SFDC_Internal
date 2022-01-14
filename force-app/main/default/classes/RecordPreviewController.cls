public with sharing class RecordPreviewController {
    
    /*
        This method is used to fetch records on the sobjectName and fields parameter.
    */
    @AuraEnabled
    public static List<Sobject> fetchRecordList(String sobjectName, String fields ){
        
        List<String> fieldset = new List<String>();

        String fieldString;
        if(fields != null) {
            List<String> fieldNames =  (List<String>) JSON.deserialize(fields, List<String>.class);
            
            for(String eachFieldName : fieldNames) {
                fieldset.add(String.valueOf(eachFieldName));
                if(fieldString != null){
                    fieldString = fieldString + ',' + eachFieldName;
                }
                else{
                    fieldString = eachFieldName;
                }
            }
        }
        String fieldQuery = 'SELECT Id, ' + fieldString + ' FROM ' + sobjectName + ' LIMIT 10';
        List<sObject> sobjList = Database.query(fieldQuery);



        WrapperClass wrap = new WrapperClass();
        wrap.listOfRecords = new List<Sobject>();
        wrap.listOfRecords.addAll(sobjList);
    

        Map<String, Schema.SObjectField> getFieldMap = getFields(sobjectName);
        wrap.mapOfFieldLabelToValue = new Map<String, String>();
        for(String fieldApi : fieldset){
            if(getFieldMap.containsKey(fieldApi)){
                wrap.mapOfFieldLabelToValue.put(fieldApi, getFieldMap.get(fieldApi).getDescribe().getLabel());
            }
        }
        
        System.debug('mapOfFieldLabelToValue---'+wrap.mapOfFieldLabelToValue);
        
        Map<Id, Map<String, String>> mapString = new Map<Id, Map<String, String>>();

        for(String apiStr : wrap.mapOfFieldLabelToValue.keySet()){
            for(Sobject s : sobjList){
                if(!mapString.containsKey(s.Id)){
                    mapString.put(s.Id, new Map<String, String>());
                }
                mapString.get(s.Id).put(wrap.mapOfFieldLabelToValue.get(apiStr), String.valueOf(s.get(apiStr)));
            }
        }

        System.debug('mapString----'+mapString);
        System.debug('mapString----'+mapString.size());


        System.debug('wrap---'+wrap);
        return sobjList;
    }

   public static Map<String, Schema.SObjectField> getFields(String type){
        type='Account';

        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.SObjectType leadSchema = schemaMap.get(type);
        Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();


        /*for (String fieldName: fieldMap.keySet()) {

        System.debug('##Field API Name='+fieldName);// list of all field API name

        System.debug(fieldMap.get(fieldName).getDescribe().getLabel());//It provides to get the object fields label.
        }*/
        return fieldMap;
    }

   
        
    public class WrapperClass {
        @AuraEnabled public List<Sobject> listOfRecords;
        @AuraEnabled public Map<String, String> mapOfFieldLabelToValue;
    }

}