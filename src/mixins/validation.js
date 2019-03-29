/* Verify data submitted in object form, modeled on Laravel validation */

/*
example usage:

validate({
    email       : [ this.email,     "required|email"],
    password    : [ this.password,  "required|min:5"],
})

 */

export default {
  data: () => ({
    validationErrors: {},
    validated: {},

    errorMessages: {
      required: " is required",
      max: " exceeds the maximum length",
      min: " is too short",
      numeric: " is not a number",
      url: " is not a valid URL",
      email: " is not a valid email",
      boolean: " is not a boolean",
      date: " is not a date",
      includes: " does not include ",
      array: " is not an array",
      object: " is not an object",
      matches: " does not match "
    }
  }),
  methods: {
    customMessages(messages) {
      if (typeof messages !== "object")
        return console.error("messages is not a valid object");

      const keys = Object.keys(messages);

      for (var i = keys.length - 1; i >= 0; i--) {
        let key = keys[i];
        this.errorMessages[key] = messages[key];
      }
    },
    validate(validation, verbose = true) {
      this.validationErrors = {};
      var errors = false;

      if (typeof validation !== "object")
        return console.error("Validation object must be of type object");

      for (var key in validation) {
        let rules = validation[key][1],
          item = validation[key][0];

        var status = this.validateItem(item, rules, verbose);

        if (status !== true) {
          this.validationErrors[key] = this.capitalize(key) + " " + status;
          errors = true;
        } else {
          this.validated[key] = validation[key][0];
        }
      }

      return errors ? false : true;
    },
    validateItem(item, rules, verbose = false) {
      rules = rules.split("|");

      for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];

        if (rule.includes(":")) {
          var components = rule.split(":");
          var parameter = components[1];
          rule = components[0];
        }

        switch (rule) {
          case "required":
            if (!item || item.length == 0)
              return verbose ? this.errorMessages[rule] : false;
            break;
          case "max":
            if (item.length > parameter)
              return verbose ? this.errorMessages[rule] : false;
            break;
          case "min":
            if (item.length < parameter)
              return verbose ? this.errorMessages[rule] : false;
            break;
          case "url":
            if (!this.isUrl(item))
              return verbose ? this.errorMessages[rule] : false;
            break;
          case "email":
            if (!this.isEmail(item))
              return verbose ? this.errorMessages[rule] : false;
            break;
          case "numeric":
            if (!isNaN(item)) return verbose ? this.errorMessages[rule] : false;
            break;
          case "date":
            if (!isNan(Date.parse(item)))
              return verbose ? this.errorMessages[rule] : false;
            break;
          case "array":
            if (typeof item !== "array")
              return verbose ? this.errorMessages[rule] : false;
            break;
          case "object":
            if (typeof item !== "object")
              return verbose ? this.errorMessages[rule] : false;
            break;
          case "in":
          case "has":
          case "includes":
          case "contains":
            if (!item.includes(parameter))
              return verbose
                ? this.errorMessages["includes"] + parameter
                : false;
            break;
          case "match":
          case "matches":
            if (item !== parameter)
              return verbose ? this.errorMessages["match"] + parameter : false;
            break;
          case "boolean":
            if (typeof item !== "boolean")
              return verbose ? this.errorMessages[rule] : false;
            break;
        }
      }

      return true;
    },
    isUrl: url =>
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        url
      ),
    isEmail: email =>
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      ),
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
