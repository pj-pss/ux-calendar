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

    viewRender: function (view) {
      var title = view.title;
      $(".calendar-title").html(title);
      // if (view.name == 'agendaDay') {
      //   $('table').find('.fc-day-header').html('');
      // }
    },

    eventAfterAllRender: function (view) {
      if (view.name == 'listYear') {
        displayListYear();
      }

      // if (view.name == 'agendaDay') {
      //   $('table').find('.fc-day-header').html('');
      // }

    },

    navLinks: true, // can click day/week names to navigate views
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
        $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
      }
      $('#calendar').fullCalendar('unselect');
    },
    editable: true,
    eventLimit: true, // allow "more" link when too many events
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
      // {
      //   title: 'Long Event',
      //   start: '2018-03-07',
      //   end: '2018-03-10',
      //   color: '#FF4F5E'
      // },
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
      // {
      //   title: 'Conference',
      //   start: '2018-03-11',
      //   end: '2018-03-13',
      //   color: '#FF4F5E'
      // },
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
    $('#calendar').fullCalendar('prev'); // call method
    ControlFooter($('#list'));
    displayListYear();
  });

  $('#next').on('click', function () {
    $('#calendar').fullCalendar('next'); // call method
    ControlFooter($('#list'));
    displayListYear();
  });

  $('#today-btn').on('click', function () {
    $('#calendar').fullCalendar('today'); // call method
  });

  $('#month').on('click', function () {
    $('#calendar').fullCalendar('changeView', 'month'); // call method
    ControlFooter($(this));
  });

  $('#day').on('click', function () {
    // var date = new Date();
    $('#calendar').fullCalendar('changeView', 'agendaDay'); // call method
    ControlFooter($(this));
  });

  $('#list').on('click', function () {
    displayListYear();
  });

  //フッターのオレンジをはずす
  function ControlFooter(target) {
    $('.switching-menu').find('.clicked').removeClass('clicked');
    var result = $('.switching-menu').find('.current');
    result.removeClass('current');
    target.addClass('current');
  }

  function displayListYear() {
    var list_btn = $('#list');

    // List Calendar Button Click(First)
    if (list_btn.hasClass('clicked')) {} else {
      ControlFooter(list_btn);
      list_btn.addClass('clicked');
      $('#calendar').fullCalendar('changeView', 'listYear'); // call method

      // Add Month Header
      var fc_list_heading = $('.fc-list-table').find('.fc-list-heading');

      var fc_list_date; //リストの日付
      var dt;
      var Y_check;
      var M_check;

      //配列の一番最初に対して実施
      fc_list_date = $(fc_list_heading[0]).data('date');
      dt = new Date(fc_list_date);
      //チェック用

      Y_check = dt.getFullYear();
      M_check = dt.getMonth();

      $(fc_list_heading[0]).before('<tr class="list-month list-' + (M_check + 1) + 'month"><th class="list-month-title" colspan="3">' + Y_check + '年' + (M_check + 1) + '月' + '</th></tr>');


      //配列の2番目以降から実施
      for (i = 1; i < fc_list_heading.length; i++) {

        //日付のデータだけ取得
        fc_list_date = $(fc_list_heading[i]).data('date');

        //日付型に変換
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