(function(_, Backbone, StateMachine) {

    var wrapEvent = function(stateMachineEvent, eventName) {
        var _stateMachineEvent = stateMachineEvent;

         return function(fsm, name, from, to, args) {
             if(fsm._ctx) {
                fsm._ctx.trigger("fsm:" + eventName, fsm, name, from, to, args);
                fsm._ctx.trigger("fsm:" + eventName+ ":" + name,  fsm, name, from, to, args);
            }

            return _stateMachineEvent(fsm, name, from, to, args);
        }
    }

    //*********************************************************************
    // Override StateMachine events
    //*********************************************************************
    StateMachine.beforeEvent = wrapEvent(StateMachine.beforeEvent, "before");
    StateMachine.afterEvent = wrapEvent(StateMachine.afterEvent, "after");
    StateMachine.leaveState = wrapEvent(StateMachine.leaveState, "leave");
    StateMachine.enterState = wrapEvent(StateMachine.enterState, "enter");

    function mixinStateMachine(obj) {
        var fsmConfig = _.result(obj, "stateMachine");

        if(fsmConfig) {
            obj.stateMachine = _.extend(StateMachine.create(fsmConfig), {_ctx: obj});
        }

        return obj;
    }


    //*********************************************************************
    // Override Backbone constructors
    //*********************************************************************
    var View = Backbone.View.prototype.constructor;
    Backbone.View = Backbone.View.extend({
        constructor: function(options) {
            mixinStateMachine(this);

            View.apply(this, arguments);
        }
    })

    var Model = Backbone.Model.prototype.constructor;
    Backbone.Model = Backbone.Model.extend({
        constructor: function(options) {
            mixinStateMachine(this);

            Model.apply(this, arguments);
        }
    })

    var Collection = Backbone.Collection.prototype.constructor;
    Backbone.Collection = Backbone.Collection.extend({
        constructor: function(options) {
            mixinStateMachine(this);

            Collection.apply(this, arguments);
        }
    })

}(_, Backbone, StateMachine))