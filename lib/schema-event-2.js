const languages = require('./languages')

module.exports = {
  additionalProperties: false,
  required: [
    'event_id',
    'type',
    'user',
    'version',
    'created'
  ],
  properties: {
    // Required of all events
    event_id: {
      type: 'string',
      description: 'The unique identifier of the event.',
      format: 'uuid'
    },
    type: {
      type: 'string',
      description: 'The type of the event.',
      enum: ['page', 'exit', 'link', 'search', 'navigate', 'survey', 'experiment']
    },
    user: {
      type: 'string',
      description: 'The unique identifier of the current user performing the event. Please use randomly generated values or hashed values; we don\'t want to be able to look up in a database.',
      format: 'uuid'
    },
    version: {
      type: 'string',
      description: 'The version of the event schema.',
      pattern: /^\d+(\.\d+)?(\.\d+)?$/
    },
    created: {
      type: 'string',
      format: 'date-time',
      description: 'The time we created the event; please reference UTC.'
    },
    token: {
      type: 'string',
      description: 'A honeypot.',
      maxLength: 0
    },

    // Content information
    path: {
      type: 'string',
      description: 'The browser value of `location.pathname`.',
      format: 'uri-reference'
    },
    referrer: {
      type: 'string',
      description: 'The browser value of `document.referrer`.',
      format: 'uri-reference'
    },
    search: {
      type: 'string',
      description: 'The browser value of `location.search`.'
    },
    href: {
      type: 'string',
      description: 'The browser value of `location.href`.',
      format: 'uri'
    },
    site_language: {
      type: 'string',
      description: 'The language the user is viewing.',
      enum: Object.keys(languages)
    },

    // Device information
    os: {
      type: 'string',
      description: 'The type of operating system the user is working with.',
      enum: ['windows', 'mac', 'linux', 'ios', 'android', 'other'],
      default: 'other'
    },
    os_version: {
      type: 'string',
      description: 'The version of the operating system the user is using.'
    },
    browser: {
      type: 'string',
      description: 'The type of browser the user is browsing with.',
      enum: ['chrome', 'safari', 'firefox', 'edge', 'ie', 'other'],
      default: 'other'
    },
    browser_version: {
      type: 'string',
      description: 'The version of the browser the user is browsing with.'
    },
    viewport_width: {
      type: 'number',
      description: 'The viewport width, not the overall device size.',
      minimum: 1
    },
    viewport_height: {
      type: 'number',
      description: 'The viewport height, not the overall device height.',
      minimum: 1
    },

    // Location information
    timezone: {
      type: 'number',
      description: 'The timezone the user is in, as `new Date().getTimezoneOffset() / -60`.'
    },
    user_language: {
      type: 'string',
      description: 'The browser value of `navigator.language`.'
    }
  },
  oneOf: [{
    // *** type: page ***
    required: [
      'path',
      'href'
    ],
    properties: {
      type: {
        type: 'string',
        pattern: /^page$/
      },
      page_render_duration: {
        type: {
          type: 'number',
          description: 'How long the server took to render the page content, in seconds.',
          minimum: 0.001
        }
      }
    }
  }, {
    // *** type: exit ***
    required: [
      'exit_page_id'
    ],
    properties: {
      type: {
        type: 'string',
        pattern: /^exit$/
      },
      exit_page_id: {
        type: 'string',
        format: 'uuid',
        description: 'The value of the corresponding `page` event.'
        // id of the "page" event
      },
      exit_first_paint: {
        type: 'number',
        minimum: 0.001,
        description: 'The duration until `first-contentful-paint`, in seconds. Informs CSS performance.'
      },
      exit_dom_interactive: {
        type: 'number',
        minimum: 0.001,
        description: 'The duration until `PerformanceNavigationTiming.domInteractive`, in seconds. Informs JavaScript loading performance.'
      },
      exit_dom_complete: {
        type: 'number',
        minimum: 0.001,
        description: 'The duration until `PerformanceNavigationTiming.domComplete`, in seconds. Informs JavaScript execution performance.'
      },
      exit_visit_duration: {
        type: 'number',
        minimum: 0.001,
        description: 'The duration of exit.timestamp - page.timestamp, in seconds. Informs bounce rate.'
      },
      exit_scroll_length: {
        type: 'number',
        minimum: 0,
        maximum: 1,
        description: 'The percentage of how far the user scrolled on the page.'
      }
    }
  }, {
    // *** type: link ***
    required: [
      'link_url'
    ],
    properties: {
      type: {
        type: 'string',
        pattern: /^link$/
      },
      link_url: {
        type: 'string',
        format: 'uri',
        description: 'The href of the anchor tag the user clicked, or the page or object they directed their browser to.'
      }
    }
  }, {
    // *** type: search ***
    required: [
      'search_query'
    ],
    properties: {
      type: {
        type: 'string',
        pattern: /^search$/
      },
      search_query: {
        type: 'string',
        description: 'The actual text content of the query string the user sent to the service.'
      },
      search_context: {
        type: 'string',
        description: 'Any additional search context, such as component searched.'
      }
    }
  }, {
    // *** type: navigate ***
    properties: {
      type: {
        type: 'string',
        pattern: /^navigate$/
      },
      navigate_label: {
        type: 'string',
        description: 'An identifier for where the user is navigating.'
      }
    }
  }, {
    // *** type: survey ***
    properties: {
      type: {
        type: 'string',
        pattern: /^survey$/
      },
      survey_vote: {
        type: 'boolean',
        description: 'Whether the user found the page helpful.'
      },
      survey_comment: {
        type: 'string',
        description: 'Any textual comments the user wanted to provide.'
      },
      survey_email: {
        type: 'string',
        format: 'email',
        description: 'The user\'s email address, if the user provided and consented.'
      }
    }
  }, {
    // *** type: experiment ***
    required: [
      'experiment_name',
      'experiment_variation'
    ],
    properties: {
      type: {
        type: 'string',
        pattern: /^experiment$/
      },
      experiment_name: {
        type: 'string',
        description: 'The test that this event is part of.'
      },
      experiment_variation: {
        type: 'string',
        enum: ['control', 'treatment'],
        description: 'The variation this user we bucketed in, such as control or treatment.'
      },
      experiment_success: {
        type: 'boolean',
        default: true,
        description: 'Whether or not the user successfully performed the test goal.'
      }
    }
  }]
}
