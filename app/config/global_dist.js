/**
 * Created by priit on 27.08.15.
 */
define([], function () {

    return {
        API_URL: 'http://dev.bitweb.ee:3000/api/v1', //http://localhost:8000/api/v1', //API_URL : 'http://dev.bitweb.ee:3000/api/v1',
        user : {
            roles: ['regular', 'admin']
        },
        project: {
            userRoles: ['editor', 'viewer']
        },
        resource_type: {
            split_types: ['NONE', 'LINE', 'BYTE']
        },
        hearbeat_interval: 360000
    };

});