var items = [
    [{
        'text': 'menu1',
        'sub_items': [
            {
                'text': 'menu1_sub1',
                'func': function () {
                    console.log('menu1_sub1');
                }
            }, {
                'text': 'menu1_sub2',
                'func': function () {
                    console.log('menu1_sub2');
                }
            }
        ]
    }, {
        'text': 'menu2',
        'func': function () {
            console.log('menu2');
        }
    }]
    , [
        {
            'text': 'menu3',
            'func': function () {
                console.log('menu2');
            }
        }
    ],
    {
        'text': 'menu4',
        'func': function () {
            console.log('menu2');
        }
    }
];

var options = {
    'items': items,
    'width': 300,
};

(function ($) {
    // 默认设置
    var defaults = {};

    // 构造函数
    function ContextMenu(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options || {});

        this.init();
    }

    ContextMenu.prototype = {
        Constructor: ContextMenu,
        init: function () {
            $(this.element).on('contextmenu', function (e) {
                e.preventDefault();


            });

            var menuHtml = createMenuHtml(this.options.items);

            $('body').append(menuHtml);
        }
    };

    $.fn.contextMenu = function (options) {
        return this.each(function () {
            var contextMenu = $(this).data('context-menu');
            if (!contextMenu) {
                $(this).data('context-menu', new ContextMenu(this, options));
            }

            if (Object.prototype.toString.call(options) === '[object String]') {
                if (typeof contextMenu[options] == 'function') {
                    contextMenu[options]();
                }
            }
        });
    }

    function createMenuHtml(items) {
        var menuHtml = '';

        if (Array.isArray(items) && items.length) {
            menuHtml += '<ul>';

            $.each(items, function (i, item) {
                if (i) {
                    menuHtml += '<li class="li-separator"></li>';
                }

                if (Array.isArray(item)) {
                    $.each(item, function (j, menu) {
                        menuHtml += '<li class="">' + menu.text + '</li>';

                        if (menu.sub_items) {
                            menuHtml += createMenuHtml(menu.sub_items);
                        }
                    })
                } else {
                    menuHtml += '<li class="">' + item.text + '</li>';
                }
            })
        }

        menuHtml += '</ul>';

        return menuHtml;
    }
}(jQuery));
