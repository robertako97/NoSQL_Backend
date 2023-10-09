const { Schema, model} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        reactedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        reactions: [reactionSchema],

    },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

reactionSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toISOString(); // Format the timestamp as an ISO string
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;