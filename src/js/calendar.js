$(function () {

  var timer = false;
  $(window).on('resize', function () {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      var container_w = $('.app-list').outerWidth(true);
      var content_w = $('div.app-list div.app-icon:eq(0)').outerWidth(true);
      var padding = (container_w % content_w) / 2;
      $('.app-list').css('padding-left', padding);
    }, 50);
  }).resize();


  $('#calendar').fullCalendar({
    header: false,
    locale: 'ja',
    defaultView: 'listYear',
    defaultDate: '2018-06-16',
    allDayText: '終日',
    axisFormat: 'HH:mm',
    timeFormat: 'HH:mm',
    slotLabelFormat: "H:mm",
    nowIndicator: true,
    views: {
      month: {
        titleFormat: 'YYYY月M月',
        fixedWeekCount: false,
        eventLimitText: '',
        dayPopoverFormat: 'YYYY年M月D日[(]ddd[)]',
      },
      listYear: {
        titleFormat: 'YYYY年'
      },
      agendaDay: {
        // titleFormat: 'M月D日[(]ddd[)]'
        titleFormat: 'M月D日'
      }
    },

    viewRender: function (view) {
      var title = view.title;
      $(".calendar-title").html(title);

    },

    eventAfterAllRender: function (view) {
      if (view.name == 'listYear') {
        displayListYear();
      }
      // if (view.name == 'agendaDay') {
      //   $('table').find('.fc-day-header').html('');
      // }
    },

    eventClick: function (calEvent, jsEvent, view) {
      window.location.href = 'C-6.html';
    },

    navLinks: true,
    selectable: true,
    selectHelper: true,
    select: function (start, end) {
      var title = prompt('Event Title:');
      var eventData;
      if (title) {
        eventData = {
          title: title,
          start: start,
          end: end
        };
        $('#calendar').fullCalendar('renderEvent', eventData, true);
      }
      $('#calendar').fullCalendar('unselect');
    },
    editable: true,
    eventLimit: true,
    height: 'parent',
    events: [{
        title: '蒲田にて',
        start: '2018-06-08T10:30:00',
        end: '2018-06-08T12:30:00',
        color: '#FF4F5E'
      },
      {
        title: '太郎さんの誕生日',
        start: '2018-06-16',
        end: '2018-06-19',
        color: '#4CA1D0'
      },
      {
        title: '会議',
        start: '2018-06-16T10:00:00',
        end: '2018-06-16T10:30:00',
        color: '#FF4F5E'
      },
      {
        title: '打ち合わせ',
        start: '2018-06-16T11:00:00',
        end: '2018-06-16T12:00:00',
        color: '#FF4F5E'
      },
      {
        title: '打ち合わせ',
        start: '2018-06-16T11:30:00',
        end: '2018-06-16T13:00:00',
        color: '#FF4F5E'
      },
      {
        title: 'Meeting',
        start: '2018-06-16T14:00:00',
        end: '2018-06-16T15:00:00',
        color: '#FF4F5E'
      },
      {
        title: 'Meeting',
        start: '2018-06-16T15:00:00',
        end: '2018-06-16T16:00:00',
        color: '#FF4F5E'
      },
      {
        title: '七夕',
        start: '2018-07-07',
        color: '#4CA1D0'
      }
    ],

    displayEventTime: true,
    displayEventEnd: {
      month: true,
      basicWeek: true,
      'default': true
    }
  });


  $('#prev').on('click', function () {
    $('#calendar').fullCalendar('prev');

    var view = $('#calendar').fullCalendar('getView');
    if (view.name == 'listYear') {
      ControlFooter($('#list'));
      displayListYear();
    }
  });

  $('#next').on('click', function () {
    $('#calendar').fullCalendar('next');

    var view = $('#calendar').fullCalendar('getView');
    if (view.name == 'listYear') {
      ControlFooter($('#list'));
      displayListYear();
    }
  });

  $('#today-btn').on('click', function () {
    $('#calendar').fullCalendar('today');
  });

  $('#month').on('click', function () {
    $('#today-btn').html('今月');
    $('#calendar').fullCalendar('changeView', 'month');
    ControlFooter($(this));
  });

  $('#day').on('click', function () {
    $('#today-btn').html('今日');
    $('#calendar').fullCalendar('changeView', 'agendaDay');
    ControlFooter($(this));
  });

  $('#list').on('click', function () {
    $('#today-btn').html('今年');
    displayListYear();
  });

  $('#edit-btn').on('click', function () {
    $(this).html('保存');
    var input_tag = $('main').find('input');
    for (i = 0; i < input_tag.length; i++) {
      input_tag[i].disabled = false;
    }

    var textarea_tag = $('main').find('textarea');
    for (i = 0; i < textarea_tag.length; i++) {
      textarea_tag[i].disabled = false;
    }

    $('.event-toggle-btn').removeClass('disable');
    $('#event-title').focus();
  });


  /**
   * ControlFooter
   * @param {*} target 
   */
  function ControlFooter(target) {
    $('.switching-menu').find('.clicked').removeClass('clicked');
    var result = $('.switching-menu').find('.current');
    result.removeClass('current');
    target.addClass('current');
  }

  /**
   * displayListYear
   * Event List's Layout Custom method
   */
  function displayListYear() {
    var list_btn = $('#list');

    // List Calendar Button Click(First)
    if (list_btn.hasClass('clicked')) {} else {
      ControlFooter(list_btn);
      list_btn.addClass('clicked');
      $('#calendar').fullCalendar('changeView', 'listYear'); // call method

      // Add Month Header
      var fc_list_heading = $('.fc-list-table').find('.fc-list-heading');

      var fc_list_date; //List's date
      var dt;
      var Y_check;
      var M_check;

      //Processing on the first element of the array
      fc_list_date = $(fc_list_heading[0]).data('date');
      dt = new Date(fc_list_date);

      //For date check 
      Y_check = dt.getFullYear();
      M_check = dt.getMonth();

      $(fc_list_heading[0]).before('<tr class="list-month list-' + (M_check + 1) + 'month"><th class="list-month-title" colspan="3">' + Y_check + '年' + (M_check + 1) + '月' + '</th></tr>');

      //Processing on after second element of the array
      for (i = 1; i < fc_list_heading.length; i++) {

        //get date data
        fc_list_date = $(fc_list_heading[i]).data('date');

        //change date class
        dt = new Date(fc_list_date);

        if (dt.getFullYear() == Y_check && dt.getMonth() == M_check) {

        } else {

          Y_check = dt.getFullYear();
          M_check = dt.getMonth();

          $(fc_list_heading[i]).before('<tr class="list-month list-' + (M_check + 1) + 'month"><th class="list-month-title" colspan="3">' + Y_check + '年' + (M_check + 1) + '月' + '</th></tr>');
        }
      }
    }

  }



});