define(['angularAMD'], function (angularAMD) {

    angularAMD.service('WorkflowDefinitionService', ['$http', 'config', '$modal', '$log',
        function ($http, config, $modal, $log) {
            var self = this;

            this.openAddDefinitionModal = function ($scope, project) {
                return $modal.open({
                    templateUrl: '../../views/workflow/add_definition_modal.html',
                    scope: $scope,
                    controller: 'AddDefinitionModalController',
                    resolve: {
                        project: function () {
                            return project;
                        }
                    }
                });
            };

            this.openAddWorkflowModal = function ($scope, project) {
                return $modal.open({
                    templateUrl: '../../views/workflow/add_modal.html',
                    scope: $scope,
                    controller: 'WorkflowAddModalController',
                    resolve: {
                        project: function () {
                            return project;
                        }
                    }
                });
            };

            this.createWorkflowFromDefinition = function (definitionId, projectId, callback) {

                var data = {
                    workflowDefinitionId: definitionId,
                    projectId: projectId
                };

                $http.post(config.API_URL + '/workflow/create', data).then(
                    function (data, status) {
                        console.log(data.data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.defineNewWorkflow = function (definition, callback) {

                $http.post(config.API_URL + '/workflow/define', definition).then(
                    function (data, status) {
                        console.log(data.data);
                        callback(null, data.data.data);
                    },
                    function (data, status) {
                        if (!data) {
                            return callback(status);
                        }
                        console.log(data);
                        callback(data);
                    }
                );
            };

            this.getWorkflowsDefinition = function (workflowId, callback) {

                $http.get(config.API_URL + '/workflow/' + workflowId + '/definition').then(
                    function (data, status) {
                        console.log(data.data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.getWorkflowsDefinitionsList = function (params, callback) {
                $http.get(config.API_URL + '/workflow-definition', {}).then(
                    function (data, status) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.filterDefinitionsList = function (definitions, type, name) {
                var map = {};
                var updated = [];

                for (i in definitions) {
                    var item = definitions[i];
                    if (map[item.id] == item.id) {
                        continue;
                    }
                    if (type && item.accessStatus != type) {
                        continue;
                    }
                    if (name && !(item.name.indexOf(name) > -1 || item.description.indexOf(name) > -1 || item.purpose.indexOf(name) > -1)) {
                        continue;
                    }
                    map[item.id] = item.id;
                    updated.push(item);
                }
                return updated;
            };

            this.updateDefinitionServices = function (workflow, selectedServices, callback) {
                $http.put(config.API_URL + '/workflow/' + workflow.id + '/definition/services', selectedServices).then(
                    function (data, status) {
                        console.log(data.data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.getServiceFromList = function (id, list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id == id) {
                        return list[i];
                    }
                }
            };

            this.getAvailableFollowingServices = function (selectedServices, servicesList) {

                if (selectedServices.length == 0) {
                    return self.getServicesLastVersions(servicesList);
                }

                var uniqueAvailableServices = self._getSelectedServicesContinuingServices(selectedServices, servicesList);

                //filter availableServices services last versions e leaves
                for(var i = 0; i < uniqueAvailableServices.length; i++ ){
                    var service = uniqueAvailableServices[i];

                    var inLoop = true;
                    var currentService = service;

                    while(inLoop){
                        $log.debug('While');
                        var parent = self.getActiveParent(currentService, servicesList);
                        if(!parent){
                            inLoop = false;
                            continue;
                        }
                        //in uniqueAvailableServices
                        if(uniqueAvailableServices.filter(function (item) { return item.id == parent.id })){

                            if(parent.tmpChildren == undefined){
                                parent.tmpChildren = [];
                            }
                            parent.tmpChildren.push( service.id );
                            inLoop = false;
                            continue;
                        }
                        currentService = parent;
                    }
                }

                var selectableServices = [];
                for(var i = 0; i < uniqueAvailableServices.length; i++ ){
                    if(uniqueAvailableServices[i].tmpChildren == undefined){
                        selectableServices.push(uniqueAvailableServices[i]);
                    }
                }

                return selectableServices;
            };

            this._getSelectedServicesContinuingServices = function(selectedServices, servicesList){

                var availableServices = [];

                if (selectedServices.length == 0) {
                    return servicesList;
                }

                //get selected services continuing services
                for ( var i = 0 ; i < selectedServices.length; i++ ) {
                    var service = self.getServiceFromList(selectedServices[i].serviceId, servicesList);
                    if (!service) {
                        continue;
                    }
                    for (j in service.childServices) {
                        var followingService = self.getServiceFromList(service.childServices[j], servicesList);

                        //reset tmp children
                        delete followingService.tmpChildren;

                        availableServices.push(followingService);
                    }
                }

                //filter unique services
                return availableServices.filter(function (value, index, self) {
                    return self.indexOf(value) === index;
                });
            };

            this.getServicesLastVersions = function (services) {
                var leaves = [];
                for (var i = 0; i < services.length; i++) {
                    var service = services[i];
                    if(service.childVersions == undefined && service.isActive == true){
                        leaves.push( service );
                    } else {
                        $log.debug('Is some oldie: ', service);
                    }
                }
                return leaves;
            };

            //add child versions
            this.getMappedServices = function ( services ) {

                for( var i = 0; i < services.length; i++) {
                    var service = services[i];
                    var parent = self.getActiveParent(service, services);
                    if(parent){
                        if(parent.childVersions == undefined){
                            parent.childVersions = [];
                        }
                        parent.childVersions.push( service.id );
                    }
                }

                return services;
            };

            //skip not active services
            this.getActiveParent = function (service, services) {
                if (service.parentVersionId !== null) {
                    var parent = self.getServiceFromList(service.parentVersionId, services);
                    if(parent){
                        if(parent.isActive){
                            return parent;
                        }
                        return self.getActiveParent(parent, services);
                    }
                }
                return null;
            };


            this.getSelectedServiceVersions = function ( index, selectedServices, services) {

                var selectedService = selectedServices[ index ];
                var selectedServiceServiceId = selectedService.serviceId;

                var service = self.getServiceFromList( selectedServiceServiceId, services);

                $log.debug( 'Service: ', service );


                var versions = [service];
                var current = service;

                $log.debug('WHILE parentVersionId: ' + current.parentVersionId);
                while(current && current.parentVersionId != null){
                    $log.debug('WHILE parentVersionId: ' + current.parentVersionId);

                    current = self.getServiceFromList( current.parentVersionId, services);
                    if(current.isActive){
                        versions.unshift( current );
                    }
                }

                versions = self._mapChildVersionsToList( service, versions, services );
                $log.debug( 'Versions: ', versions );

                var previousSelectedServices = [];
                for( var i = 0; i < index; i++ ){
                    previousSelectedServices.push(selectedServices[i]);
                }

                $log.debug('PreviousSelected services: ', previousSelectedServices);

                var previousContinuingServices = self._getSelectedServicesContinuingServices(previousSelectedServices, services);

                $log.debug('Previous following: ', previousContinuingServices);

                var availableVersions = [];
                for(var i = 0; i < versions.length; i++ ){
                    for(j = 0; j < previousContinuingServices.length; j++){
                        if(versions[i].id == previousContinuingServices[j].id){
                            availableVersions.push( versions[i] );
                        }
                    }
                }

                $log.debug('Available versions: ', availableVersions);
                return availableVersions;
            };

            this._mapChildVersionsToList = function (service, versions, services) {

                if(!service.childVersions){
                    return versions;
                }
                for(var i = 0; i < service.childVersions.length; i++ ){
                    var version = self.getServiceFromList( service.childVersions[i], services);
                    if(version && version.isActive){
                        versions.push( version );
                    }
                    versions = self._mapChildVersionsToList( version, versions, services );
                }
                return versions;
            };

            //every next service must have previousService
            this.willBeCorrectFlowFlow = function( changedIndex, newServiceId, selectedServices, servicesList ){

                for(var k = 0; k < selectedServices.length; k++){
                    var currentServiceId = selectedServices[k].serviceId;
                    if(k == changedIndex){
                        currentServiceId = newServiceId;
                    }

                    if(k == 0){
                        continue;
                    }

                    var hasPrevious = false;
                    for( var m = 0; m < k; m++ ){

                        var previousServiceId = selectedServices[m].serviceId;
                        if(m == changedIndex){
                            previousServiceId = newServiceId;
                        }

                        var previousService = self.getServiceFromList(previousServiceId, servicesList);
                        if(previousService.childServices.indexOf(currentServiceId) !== -1){
                            hasPrevious = true;
                        }
                    }

                    if(hasPrevious == false){
                        return false;
                    }
                }

                return true;
            };

        }
    ]);
});