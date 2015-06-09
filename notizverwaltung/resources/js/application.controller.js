/**
 * Created by mi on 09.06.2015.
 */
var applicationController = (function () {

    var AppModel;

    function storeItem() {

        try {

            localStorage.setItem(CONSTANTS.STORAGE_KEY_APPLICATION_MODEL, JSON.stringify(AppModel.getModel()));

        } catch(e) {

        }

    }

    function createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function setModell(model) {
        AppModel = model;
    }

    return {
        store: storeItem,
        model: setModell,
        getUUID: createUUID
    }
})();