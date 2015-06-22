var model_factory = (function(){

    /**
     *  Private
     */

    function model(uuid, creationDate, isDone, title, description, dueByDate, importance) {
        var self = this;

        self.uuid = uuid;
        self.creationDate = creationDate;
        self.title = title;
        self.description = description;
        self.dueByDate = dueByDate;
        self.importance = importance;
        self.isDone = isDone;


        self.setStateDone = function(state) {
            self.isDone = state;
        };

        self.getState = function() {
            return self.isDone;
        };

        self.getValuesAsObject = function() {
            return {
                uuid: self.uuid,
                creationDate: self.creationDate,
                title: self.title,
                description: self.description,
                dueByDate: self.dueByDate,
                importance:  self.importance,
                isDone: self.isDone
            }
        };

    }

    privateCreateInstance = function(uuid, creationDate, isDone, title, description, dueByDate, importance) {
        return new model(uuid, creationDate, isDone, title, description, dueByDate, importance);
    };

    /**
     * Public
     */
    publicCreateInstance = function(uuid, creationDate, isDone, title, description, dueByDate, importance) {
        return privateCreateInstance(uuid, creationDate, isDone, title, description, dueByDate, importance);
    };

    return {
        create: publicCreateInstance
    }
})();
