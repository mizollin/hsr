var APPLICATION_MODEL = (function () {
    function ApplicationModel() {
        this.theme = CONSTANTS.VAL_THEME_DEFAULT;
        this.sortStrategy = null;
        this.isShowDone = true;
    }

    var privateApplicationModel = null;
    var privateNotesRepository = null;

    function store() {
        localStorage.setItem(CONSTANTS.STORAGE_KEY_APPLICATION_MODEL, JSON.stringify(privateApplicationModel));
    }

    function load() {
        return JSON.parse(localStorage.getItem(CONSTANTS.STORAGE_KEY_APPLICATION_MODEL));
    }

    function publicInitialize(notesRepository) {
        privateNotesRepository = notesRepository;
        privateApplicationModel = new ApplicationModel();

        var storedModel = load();
        if (storedModel === null) {
            store();
        }
        else {
            privateApplicationModel.sort = storedModel.sort;
            privateApplicationModel.theme = storedModel.theme;
            privateApplicationModel.isShowDone = storedModel.isShowDone;
        }
    }

    function publicSetTheme(theme) {
        privateApplicationModel.theme = theme;
        store();
    }

    function publicGetTheme() {
        return privateApplicationModel.theme;
    }

    function publicSetSortStrategy(sortStrategy) {
        privateApplicationModel.sortStrategy = sortStrategy;
        store();
    }

    function publicGetSortStrategy() {
        return privateApplicationModel.sortStrategy;
    }

    function publicSetShowDone(showDone) {
        privateApplicationModel.isShowDone = showDone;
    }

    function publicGetShowDone() {
        return privateApplicationModel.isShowDone;
    }

    function publicGetNotesRepository() {
        return privateNotesRepository;
    }

    return {
        initialize: publicInitialize,
        getNotesRepository: publicGetNotesRepository,
        setTheme: publicSetTheme,
        getTheme: publicGetTheme,
        setSortStrategy: publicSetSortStrategy,
        getSortStrategy: publicGetSortStrategy,
        setShowDone: publicSetShowDone,
        getShowDone: publicGetShowDone,
    };
})();