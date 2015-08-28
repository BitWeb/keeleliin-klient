/**
 * Created by priit on 28.08.15.
 */
////////////
/**
 * JStree Actionmenu plugin
 */
$.jstree.plugins.actionmenu = function (options, parent) {
    this.bind = function () {
        parent.bind.call(this);
        var self = this;
        this.element
            .on("click.jstree", ".fa-download", function (e) {
                self.element.trigger("downloadAction", $(this).closest('.jstree-leaf').attr('id'));
            })
            .on("click.jstree", ".fa-info-circle", function (e) {
                self.element.trigger("infoAction", $(this).closest('.jstree-leaf').attr('id'));
            })
            .on("click.jstree", ".fa-remove", function (e) {
                self.element.trigger("deleteAction", $(this).closest('.jstree-leaf').attr('id'));
            });
    };
    this.redraw_node = function(obj, deep, callback, force_render) {
        obj = parent.redraw_node.apply(this, arguments);
        if(obj) {
            var jqObject = $(obj);
            if(jqObject.hasClass('jstree-leaf')){
                jqObject.find('a:first').append(
                    '<span class="action-buttons">' +
                        '<i class="fa fa-download m-r-xs"></i>' +
                        '<i class="fa fa-info-circle m-r-xs"></i>' +
                        '<i class="fa fa-remove text-danger"></i>' +
                    '</span>' );
            }
        }
        return obj;
    };
};