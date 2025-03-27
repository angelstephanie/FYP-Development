import web3 from "./web3";
const address = "0x773E04f012D1Cb085b4E6bB8D55821a69ce78F88";
const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "staffName",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "specialty",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "qualifications",
        type: "string[]",
      },
      {
        internalType: "string",
        name: "schedule",
        type: "string",
      },
    ],
    name: "addMedicalProfessional",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "dob",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "sex",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "ehrNumber",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "phoneNo",
        type: "uint256",
      },
    ],
    name: "addUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "dob",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "sex",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "ehrNumber",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "phoneNo",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "date",
        type: "string",
      },
      {
        internalType: "string",
        name: "time",
        type: "string",
      },
    ],
    name: "bookAppointment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bookingId",
        type: "uint256",
      },
    ],
    name: "cancelAppointment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "hospitalName",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dob",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "sex",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "ehrNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "phoneNo",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "bookingId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "date",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "time",
        type: "string",
      },
    ],
    name: "AppointmentBooked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "bookingId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "ehrNumber",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "date",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "time",
        type: "string",
      },
    ],
    name: "AppointmentCanceled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
    ],
    name: "removeMedicalProfessional",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllMedicalProfessionals",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "staffId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "staffName",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "specialty",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "qualifications",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "schedule",
            type: "string",
          },
        ],
        internalType: "struct MyContract.MedicalProfessional[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
    ],
    name: "getAvailableAppointments",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "ehrNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "staffId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bookingId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "date",
            type: "string",
          },
          {
            internalType: "string",
            name: "time",
            type: "string",
          },
        ],
        internalType: "struct MyContract.BookingAppointment[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "staffId",
        type: "uint256",
      },
    ],
    name: "getMedicalProfessionalById",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "staffId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "staffName",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "specialty",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "qualifications",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "schedule",
            type: "string",
          },
        ],
        internalType: "struct MyContract.MedicalProfessional",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "ehrNumber",
        type: "uint256",
      },
    ],
    name: "getUserAppointments",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "ehrNumber",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "staffName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "bookingId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "date",
            type: "string",
          },
          {
            internalType: "string",
            name: "time",
            type: "string",
          },
        ],
        internalType: "struct MyContract.UserBooking[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "ehrNumber",
        type: "uint256",
      },
    ],
    name: "getUserByEhrNumber",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "dob",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "sex",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "ehrNumber",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "phoneNo",
            type: "uint256",
          },
        ],
        internalType: "struct MyContract.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hospital",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default new web3.eth.Contract(abi, address);
