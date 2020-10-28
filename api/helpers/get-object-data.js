module.exports = {


  friendlyName: 'Get object data',


  description: '',


  inputs: {
    data: {
      type: 'json',
      required: true
    },
    keys: {
      type: 'ref',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {

    const data = {};

    inputs.keys.forEach(key => {

      if (inputs.data[key] !== undefined) {

        data[key] = inputs.data[key];

      }

    });

    return exits.success(data);

  }


};

