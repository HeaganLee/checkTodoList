window.onload = () => {
    TodoEvent.getInstance().addEventPlusButtonClick();
    TodoEvent.getInstance().addEventPlusKeyup();
    TodoEvent.getInstance().addEventAllDelete();
    TodoEvent.getInstance().addEventSelectedDelete();
    TodoEvent.getInstance().addEventDelete();
    TodoEvent.getInstance().addEventEdit();
    TodoEventVideo.getInstance().addEventShowVideo();
    TodoEventVideo.getInstance().addEventCloseVideo();
    TodoService.getInstance();
}