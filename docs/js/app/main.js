define(function (require) {
    
    window.surVisVersion = '0.1.0';

    var $ = require('jquery');

    var bib = require('app/bib');
    var selectors = require('app/selectors');
    var stats = require('app/stats');
    var timeline = require('app/timeline');
    var nav = require('app/nav');
    var tags = require('app/tags');
    var cluster = require('app/cluster');
    var entryLayout = require('app/entry_layout');

    var references = require('app/references');
    
    //Import citations from reference list (warning: experimental feature)
    //bib.referenceLists = require('data/generated/reference_lists').referenceLists;
    //references.readReferences();


    window.update = function (scrollToTop) {
        $('.tooltipstered').tooltipster('hide');
        selectors.updateSelectors();
        references.updateReferences();
        stats.updateStats();
        tags.updateTagClouds();
        cluster.updateClusters();
        entryLayout.updateEntryList();
        timeline.updateTimeline();
        //Adding nav -- this functions executes when selectors are clicked, commenting out for now
        // b/c it doesn't need to update every single time.
        // nav.updateNav();
        if (scrollToTop) {
            $('#result_body').scrollTop(0);
        }
        window.adaptHeaderSize();
    };

    window.updateShowAll = function () {
        bib.nVisibleEntries = 999999999;
        window.update(false);
    };

    window.updateShowMore = function () {
        bib.nVisibleEntries += 20;
        window.update(false);
    };

    window.updateShowPart = function () {
        // console.log("in updateShowPart 1: ",bib.sortedIDs)
        bib.nVisibleEntries = 20;
        // console.log("in updateShowPart 2: ",bib.sortedIDs)
        window.update(true);
    };

    window.updateTags = function () {
        tags.updateTagClouds();
    };

    window.updateTimeline = function () {
        timeline.updateTimeline();
    };

    window.updateTimelineLayout = function () {
        timeline.updateTimeline(true);
    };

    // Adding navigation tool ============================================
    window.updateNav = function (x,y,z) {
        nav.updateNav(x,y,z);
    };

    window.updateNavLayout = function () {
        nav.updateNav(true);
    };

    //=====================================================================

    window.toggleSelector = function (type, text, event) {
        selectors.toggleSelector(type, text, event)
    };

    window.resetSelectors = function () {
        selectors.selectors = {};
        // Dealing with nav stuff =========================================
        // console.log(clicked)
        nav.updateNav(false,true,false);
        // ================================================================
        window.updateShowPart();
    };

    window.submitSearch = function () {
        var searchInput = $('#search').find('input');
        var searchString = searchInput.val();
        if (searchString) {
            window.toggleSelector('search', searchString);
            searchInput.val('');
        }
    };

    $(window).resize(function () {
        if (window.adaptHeaderSize) {
            window.adaptHeaderSize();
        }
    });

    $(document).ready(function () {
        require('app/init_page').init();
        window.update(true);
        selectors.readQueryFromUrl();
    });

});
