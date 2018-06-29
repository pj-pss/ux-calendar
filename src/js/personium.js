/**
 * Personium
 * Copyright 2018 FUJITSU LIMITED
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * The followings should be shared among applications.
 */


$(function () {

  Drawer_Menu();
  Control_Slide_List();
  Sort_Menu();
  Control_Dialog();
  Add_Check_Mark();
  Resize_Textarea();

  /**
   * Drawer_Menu
   * param:none
   */
  function Drawer_Menu() {
    $('#drawer_btn').on('click', function () {
      $('#menu-background').show();
      $('#drawer_menu').animate({
        width: 'show'
      }, 300);
      return false;
    });

    $('#menu-background').click(function () {
      $('#drawer_menu').animate({
        width: 'hide'
      }, 300, function () {
        $('#menu-background').hide();
        return false;
      });
    });

    $('#drawer_menu').click(function (event) {
      event.stopPropagation();
    });
  }

  /**
   * Sort_Menu
   * param:none
   */
  function Sort_Menu() {
    $('#sort_btn').on('click', function () {
      $('#sort-background').show();
      $('#sort-menu').animate({
        height: 'show'
      }, 300);
      return false;
    });

    $('#sort-background').click(function () {
      $('#sort-menu').animate({
        height: 'hide'
      }, 300, function () {
        $('#sort-background').hide();
        return false;
      });
    });

    $('#sort-menu').click(function (event) {
      event.stopPropagation();
    });

    // $('.pn-check-list').click(function (event) {
    //   Add_Check_Mark($('#sort-menu'), $(this));
    // });
  }

  /**
   * Control_Slide_List
   * param: none
   */
  function Control_Slide_List() {
    var visible_area = $('.slide-list>li');
    var wide_line = $('.slide-list-line');
    var line_contents = $('.slide-list-line-contents');
    var a_tag = $('.slide-list-line-contents>a');
    var edit_btn = $('.slide-list-edit-btn');

    /*Edit Button Clicked(Page's Header)*/
    edit_btn.on('click', function () {
      if (!($(this).hasClass('editing'))) {
        if (($(this).hasClass('edited'))) {
          $(this).removeClass('edited');
        }
        
        $(this).addClass('editing');
        $('.add-new-account').css('display', 'none');
        line_contents.addClass('edit-ic');
        wide_line.animate({
          'left': '0px'
        }, 500);
      } else if (($(this).hasClass('editing')) && !($(this).hasClass('edited'))) {
        $(this).removeClass('editing');
        $(this).addClass('edited');
        wide_line.animate({
          'left': '-70px'
        }, 500);
        $('.add-new-account').css('display', 'block');
        line_contents.removeClass('edit-ic');
        line_contents.removeClass('clear-ic');
        a_tag.removeClass('disabled');
      }
    })

    /*Circle Delete Button Clicked(Page's List Left)*/
    $('.delete-check-btn').on('click', function () {
      a_tag.addClass('disabled');
      $(this).parent().animate({
        'left': '-170px'
      }, 500);
      $(this).next().addClass('clear-ic');
    })

    /*Square Delete Button Clicked(Page's List Right)*/
    $('.line-delete-btn').on('click', function () {
      $(this).closest('li').animate({
        width: 'hide',
        height: 'hide',
        opacity: 'hide'
      }, 'slow', function () {
        $(this).remove();
      });
    });

    /*Deletion When clicking an element being checked*/
    line_contents.on("click", function () {
      if ($(this).hasClass('clear-ic')) {
        if (edit_btn.hasClass('editing')) {
          wide_line.animate({
            'left': '0px'
          }, 500);
          $(this).removeClass('clear-ic');
          a_tag.removeClass('disabled');
        }
      }
    });
  }

  /**
   * Control_Dialog
   * param:none
   */
  function Control_Dialog() {
    //clicked logout button
    $('#logout').on('click', function () {
      $('.double-btn-modal').modal('show');
    });

    //single button modal
    $('.pn-single-modal').on('click', function () {
      $('.single-btn-modal').modal('show');
    });

    //three button modal
    $('.pn-three-modal').on('click', function () {
      $('.three-btn-modal').modal('show');
    });
  }

  /**
   * Add_Check_Mark
   * param:none
   */
  function Add_Check_Mark() {
    $('.pn-check-list').click(function (event) {

      //CASE: sort list
      if ($(this).parents('#sort-menu').length != 0) {
        $('#sort-menu').find('.check-mark-right').removeClass('check-mark-right');
        $(this).addClass('check-mark-right');
      }

      //CASE: icon list
      if ($(this).parents('#icon-check-list').length != 0) {
        $(this).find('.pn-icon-check').toggle();
        if (!($(this).find('.pn-icon-check').css('display') == 'none')) {
          $(this).css('background-color', '#EEEEEE');
        } else {
          $(this).css('background-color', '#FFFFFF');
        }
      }

      //CASE: check list
      if ($(this).parents('#check-list').length != 0) {

        if ($(this).hasClass('checked')) {
          $(this).removeClass('checked');
          $(this).css('background-color', '#FFFFFF');
        } else {
          $(this).addClass('checked');
          $(this).css('background-color', '#EEEEEE');
        }

      }

    });

  }

  /**
   * Add_Check_Mark
   * param:none
   */
  function Resize_Textarea() {
    $(".pn-textarea").on("input", function (evt) {
      $(evt.target).height("10px");
      $(evt.target).css("lineHeight", "30px"); //init

      var p_top = Number($(this).css('padding-top').replace('px', ''));
      var p_bottom = Number($(this).css('padding-bottom').replace('px', ''));

      var wScrollHeight = parseInt(evt.target.scrollHeight - (p_top + p_bottom));
      var wLineH = evt.target.lineHeight;

      if (wScrollHeight < (wLineH * 2)) {
        wScrollHeight = (wLineH * 1);
      }

      $(evt.target).height(wScrollHeight + "px");
    });
  }
});
