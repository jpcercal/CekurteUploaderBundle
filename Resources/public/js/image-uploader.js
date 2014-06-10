jQuery(document).ready(function($)
{
    /**
     * Realiza o upload de uma imagem
     *
     * @param Object
     *
     * @author João Paulo Cercal <sistemas@cekurte.com>
     * @version 1.0
     */
    $.fn.imageUploader = function(e) {

        /**
         * uploadField: o campo de upload (input type="file")
         *
         * imageField: o campo de imagem que será utilizado para
         * renderizar a imagem do upload
         *
         * inputHiddenField: o campo hidden no formulário que irá
         * armazenar o nome do arquivo de upload para salva-lo no
         * banco de dados (input type="hidden")
         *
         * @type {Object}
         */
        var options = {
            'uploadField'       : '#fileupload',
            'imageField'        : '#profile',
            'inputHiddenField'  : '.input-picture',
            'btnField'          : null,
            'addBtnBootstrap'   : false,
        };

        /**
         * Mescla as options do usuário com as options default
         */
        $.extend(options, e);

        $(function() {

            if (options.addBtnBootstrap === true) {

                $(options.uploadField).trigger('addbtnbootstrap');
            }
        });

        $(options.uploadField).on('addbtnbootstrap', function(event) {

            var cssClass = 'image-uploader';
            var idPart   = options.uploadField.split('#');

            var id       = idPart[1] + '_btn_uploader';

            var button = $('<button>')
                .addClass('btn')
                .addClass('btn-success')
                .addClass(cssClass)
                .attr('type', 'button')
                .attr('id', id)
                .attr('data-loading-text', 'Carregando ...')
                .text('Selecione um arquivo')
            ;

            $(options.uploadField)
                .addClass('hide')
                .before(button)
            ;

            options.btnField = $(options.uploadField).parent().find('button[type="button"]');

            $(document).on('click', '#' + id, function() {

                $(options.uploadField).trigger('click');

                $(options.btnField).button('loading');

                return false;
            });
        });

        $(options.uploadField).on('updatethumbnail', function(event, thumbnailUrl) {

            $(options.imageField).attr("src", thumbnailUrl);

            return false;
        });

        $(options.uploadField).on('updatehidden', function(event, thumbnailUrl) {

            $(options.inputHiddenField).val(thumbnailUrl);

            $(options.btnField).button('reset');

            return false;
        });

        $(options.uploadField).on('fileuploadadd', function (e, data) {

            /*
            $.each(data.files, function (index, file) {
                console.info(file.name);
            });
            */

        });

        $(options.uploadField).on('fileuploadfail', function (e, data) {

            // console.info('upload fail');

        });

        $(options.uploadField).on('fileuploaddone', function (e, data) {

            var uploadFile = data.result.path + '/' + data.result.filename;

            $(options.uploadField).trigger('updatehidden', [uploadFile]);
        });

        /**
         * Realiza o upload de imagens utilizando o blueimp
         */
        $(options.uploadField).fileupload({
            dataType        : 'json',
            autoUpload      : true,
            type            : 'POST',
        });
    };
});
