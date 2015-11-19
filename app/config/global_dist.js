/**
 * Created by priit on 27.08.15.
 */
define([], function () {

    return {
        API_URL: 'http://localhost:3000/api/v1',//http://localhost:8000/api/v1', //API_URL : 'http://dev.bitweb.ee:3000/api/v1',

        user : {
            roles: ['regular', 'admin']
        },
        project: {
            userRoles: ['editor', 'viewer']
        },
        resource_type: {
            split_types: ['NONE', 'LINE']
        },
        workflow_statuses: ['INIT', 'RUNNING', 'FINISHED', 'ERROR', 'CANCELLED'],
        hearbeat_interval: 3600
    };

});