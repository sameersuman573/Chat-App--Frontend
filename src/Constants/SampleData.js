export const Samplechats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupchat: false,
    members: ["1", "2"],
  },

  {
    avatar: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
    ],
    name: "sameer suman",
    _id: "2",
    groupchat: false,
    members: ["1", "2", "3"],
  },

];

export const SampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Raj",
    _id: "3",
    email: "sam@gamil.com",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Yash",
    _id: "4",
    email: "yash@gamil.com",
  },
];

export const SampleNotif = [
  {
    _id: "3",
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Gunjan Singh",
    },
  },

  {
    _id: "4",
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "ShantiDevi",
    },
  },
];

export const SampleMessage = [
  {
    attachment: [
      {
        public_id: "1",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],

    content: "I Miss you baba mama mammi papa and mana",
    _id: "1",

    sender: {
      _id: "12",
      name: "Raj1",
    },

    chat: "123",
  },
  {
    attachment: [
      {
        public_id: "2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],

    content: "I Miss you baba mama mammi papa and mana",
    _id: "2",

    sender: {
      _id: "23",
      name: "Raj2",
    },

    chat: "234",
  },
  {
    attachment: [
      {
        public_id: "3",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],

    content: "I Miss you baba mama mammi papa and mana",
    _id: "3",

    sender: {
      _id: "34",
      name: "Raj3",
    },

    chat: "345",
  },
];

export const dashboarddata = {
  users: [
    {
      name: "Sameer",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "sam573",
      friends: 20,
      groups: 5,
    },
    {
      name: "suman",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      username: "sum",
      friends: 80,
      groups: 1,
    },
  ],

  chats: [
    {
      name: "Raj group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      Totalmembers: 2,
      Totalmessages: 20,
      creator: {
        name: "Raj",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "Home group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: true,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      Totalmembers: 2,
      Totalmessages: 20,
      creator: {
        name: "yash",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],

  messages: [
    {
        attachments: [],
      content: "I Love my Family",
      _id: "1",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Radhe",
      },
      chat: "chatId",
      groupChat:false,
      createdAt: "2024-02-12t10:41:30.6307",
    },
    { 
        attachments: [
        {
          public_id: "3",
          url: "https://unsplash.com/photos/black-and-white-plane-flying-over-the-sea-during-daytime-rNqs9hM0U8I",
        },
      ],
      content: "I Love you mammi",
      _id: "2",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "shyam",
      },
      chat: "chatId",
      groupChat:true,
      createdAt: "2024-02-12t10:41:30.6307",
    },
  ],
};
