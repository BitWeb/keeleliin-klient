define(['angularAMD'], function (angularAMD) {

    angularAMD.service('WorkflowServiceMapper', ['$log',
        function ($log) {
            var self = this;

            var servicesList = null;
            this.setServicesList = function (list) {
                servicesList = list;
                this._mapServices();
            };

            //add child versions
            this._mapServices = function () {
                // Based on parent version add childVersions relations

                for( var i = 0; i < servicesList.length; i++) {
                    var service = servicesList[i];

                    if(service.isActive == false){
                        continue;
                    }
                    var parent = self.getActiveParentVersion(service);
                    console.log('Active parent: ', parent);
                    if(parent){
                        if(parent.childVersions == undefined){
                            parent.childVersions = [];
                        }
                        parent.childVersions.push( service.id );
                    }
                }
            };

            this.getService = function (id) {
                for (var i = 0; i < servicesList.length; i++) {
                    if (servicesList[i].id == id) {
                        return servicesList[i];
                    }
                }
            };

            this.getAvailableFollowingServices = function ( selectedServices ) {

                if (selectedServices.length == 0) {
                    return self._getServicesLastVersions();
                }

                var uniqueAvailableServices = self._getSelectedServicesContinuingServices( selectedServices );

                //filter availableServices services last versions e leaves
                for(var i = 0; i < uniqueAvailableServices.length; i++ ){
                    var service = uniqueAvailableServices[i];

                    var inLoop = true;
                    var currentService = service;

                    while(inLoop){
                        $log.debug('While');
                        var parent = self.getActiveParentVersion( currentService );
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

            this._getSelectedServicesContinuingServices = function(selectedServices){

                var availableServices = [];

                if (selectedServices.length == 0) {
                    return servicesList;
                }

                //get selected services continuing services
                for ( var i = 0 ; i < selectedServices.length; i++ ) {
                    var service = self.getService(selectedServices[i].serviceId);
                    if (!service) {
                        continue;
                    }
                    for (j in service.childServices) {
                        var followingService = self.getService(service.childServices[j]);

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

            this._getServicesLastVersions = function () {

                console.log('GET LAST VERSIONS ', servicesList);

                var leaves = [];
                for (var i = 0; i < servicesList.length; i++) {
                    var service = servicesList[i];
                    if(service.childVersions == undefined && service.isActive == true){
                        leaves.push( service );
                    } else {
                        $log.debug('Is some oldie: ', service);
                    }
                }
                return leaves;
            };

            //skip not active services
            this.getActiveParentVersion = function (service) {
                if (service.parentVersionId) {
                    var parent = self.getService(service.parentVersionId);

                    if(!parent){
                        service.parentVersionId = null;
                        return null;
                    }

                    if(parent.isActive == false){
                        service.parentVersionId = null;
                        return self.getActiveParentVersion(parent);
                    }

                    return parent;
                }
                return null;
            };


            this.getSelectedServiceVersions = function ( index, selectedServices ) {

                var selectedService = selectedServices[ index ];
                var selectedServiceServiceId = selectedService.serviceId;

                var service = self.getService( selectedServiceServiceId );

                $log.debug( 'Service: ', service );


                var versions = [service];
                var current = service;

                $log.debug('WHILE parentVersionId: ' + current.parentVersionId);
                while(current && current.parentVersionId != null){
                    $log.debug('WHILE parentVersionId: ' + current.parentVersionId);

                    current = self.getService( current.parentVersionId );
                    if(current.isActive){
                        versions.unshift( current );
                    }
                }

                versions = self._mapChildVersionsToList( service, versions );
                $log.debug( 'Versions: ', versions );

                var previousSelectedServices = [];
                for( var i = 0; i < index; i++ ){
                    previousSelectedServices.push(selectedServices[i]);
                }

                $log.debug('PreviousSelected services: ', previousSelectedServices);

                var previousContinuingServices = self._getSelectedServicesContinuingServices( previousSelectedServices );

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

            this._mapChildVersionsToList = function ( service, versions ) {

                if(!service.childVersions){
                    return versions;
                }
                for(var i = 0; i < service.childVersions.length; i++ ){
                    var version = self.getService( service.childVersions[i] );
                    if(version && version.isActive){
                        versions.push( version );
                    }
                    versions = self._mapChildVersionsToList( version, versions );
                }
                return versions;
            };

            //every next service must have previousService
            this.willBeCorrectFlowFlow = function( changedIndex, newServiceId, selectedServices ){

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

                        var previousService = self.getService(previousServiceId );
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