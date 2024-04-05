module.exports = {
  "title": "learning",
  "description": "caijiuduolian",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          {
            "text": "vue学习",
            "link": "/docs/VueLearning/"
          }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/AyanamiOffical",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
     /* "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ],*/
      "/docs/VueLearning/":[
        " ",
        "VueNote1",
        "VueNote2",
        "VueNote3",
        "VueNote4"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "vue学习" 
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "橙汁的博客",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "3222907895@qq.com",
        "link": "https://www.bilibili.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "sherlock-gmd",
    "authorAvatar": "/avatar1.jpg",
    "record": "xxxx",
    "startYear": "2023"
  },
  "markdown": {
    "lineNumbers": true
  }
}