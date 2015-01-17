//-----------------------------------------------------------------------------

QUnit.module("backbone");

//-----------------------------------------------------------------------------

test("backbone should instantiate a StateMachine", function() {

    var StateView = Backbone.View.extend({
        stateMachine: {
            initial: 'green',
            events: [
              { name: 'warn',  from: 'green',  to: 'yellow' },
              { name: 'panic', from: 'yellow', to: 'red'    },
              { name: 'calm',  from: 'red',    to: 'yellow' },
              { name: 'clear', from: 'yellow', to: 'green'  }
        ]}
    });

    var fsm = new StateView().stateMachine;

    equal(fsm.current, 'green', "initial state should be green");

    fsm.warn();  equal(fsm.current, 'yellow', "warn  event should transition from green  to yellow");

});


test("state change should trigger events", function() {

    var StateView = Backbone.View.extend({
        stateMachine: {
            initial: 'green',
            events: [
              { name: 'warn',  from: 'green',  to: 'yellow' },
              { name: 'panic', from: 'yellow', to: 'red'    },
              { name: 'calm',  from: 'red',    to: 'yellow' },
              { name: 'clear', from: 'yellow', to: 'green'  }
        ]}
    });

    var view = new StateView();
    view.on("all", function() {
        console.log(arguments);
    })

    var fsm = view.stateMachine;

    equal(view, fsm._ctx, "stateMachine instance should be set");
    fsm.warn(); equal(fsm.current, 'yellow', "warn  event should transition from green  to yellow");
    fsm.panic(); equal(fsm.current, 'red',    "panic event should transition from yellow to red");
    fsm.calm();  equal(fsm.current, 'yellow', "calm  event should transition from red    to yellow");
    fsm.clear(); equal(fsm.current, 'green',  "clear event should transition from yellow to green");
});