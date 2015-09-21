/**
 * Created by priit on 21.09.15.
 */
define([], function () {

    function includeItem(item, type, keyword ){

        if(type && item.context != type){
            return false;
        }

        if(keyword){
            var name = item.name;
            if(name.indexOf(keyword) == -1){
                return false;
            }
        }

        return true;
    }

    return {

        map: function( list, type, keyword, resourceParams ){

            var map = {};
            var treeMap = {}; //hoiab esialgseid ressursse

            var getLevel0Id = function ( item ) {

                var id = null;
                if (item.context == 'shared'){
                    id = 'shared';
                } else if (item.context == 'public') {
                    id = 'public';
                } else {
                    id = 'pr_' + item.projectId;
                }

                if(!id){
                    return null
                }

                if(!map[id]){
                    map[id] = {
                        id: id,
                        parent: '#',
                        text: item.level0,
                        state: {
                            opened: !!resourceParams.projectId
                        }
                    }
                }

                return id
            };

            var getLevel1Id = function ( item ) {
                var id = item.workflowId ? 'wf_' + item.workflowId : null;
                if(!id){
                    return null
                }

                if(!map[id]){
                    map[id] = {
                        id: id,
                        parent: getLevel0Id( item ),
                        text: item.level1,
                        state: {
                            opened: !!resourceParams.workflowId
                        }
                    }
                }

                return id
            };

            var getLevel2Id = function ( item ) {

                var id = item.serviceId ? 'se_' + item.serviceId : null;
                if(!id){
                    return null
                }

                if(!map[id]){
                    map[id] = {
                        id: id,
                        parent: getLevel1Id( item ),
                        text: item.level2,
                        state: {
                            opened:false
                        }
                    }
                }

                return id
            };

            var getResourceParentId = function ( item ) {
                var level2Id = getLevel2Id( item );
                if(level2Id){
                    return level2Id
                }

                var level1Id = getLevel1Id( item );
                if(level1Id){
                    return level1Id;
                }

                var level0Id = getLevel0Id( item );
                if(level0Id){
                    return level0Id;
                }
                return '#';
            };

            for(fileIndex in list) {
                var item = list[fileIndex];
                if(!includeItem(item, type, keyword)){
                    continue;
                }

                treeMap[fileIndex] = item;
                map[fileIndex] = {
                    id: fileIndex,
                    parent: getResourceParentId( item ),
                    text: item.name,
                    type    : "text"
                };
                console.log('Item index' + fileIndex, map[fileIndex]);
            }

            var flatTree = [];
            for(i in map){
                flatTree.push(map[i]);
            }

            return {
                resources: flatTree,
                resourcesMap: treeMap
            };
        }
    }
});