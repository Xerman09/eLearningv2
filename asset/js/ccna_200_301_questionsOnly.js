const questions = [
  {
    no: "examtopic_Q1",
    type: 'M',
    topic: '',
    question: {
      image: '../images/CCNA/exam_topic_Q1.png',
      question: 'Refer to the exhibit. Which type of route does R1 use to reach host 10.10.13.10/32?'
    },
    choices: {
      a: 'Default route',
      b: 'Network route', 
      c: 'Host route',
      d: 'Floating static route'
    },
    answer: 'b',
    explanation: 'Based on the routing table shown in the exhibit, R1 uses a network route to reach the host 10.10.13.10/32.'
  },
  {
    no: "examtopic_Q2", 
    type: 'MWI',
    topic: '',
    question: {
      image: '../images/CCNA/exam_topic_Q2.png',
      question: 'Refer to the exhibit. Which prefix does Router1 use for traffic to Host A?'
    },
    choices: {
      a: '10.10.10.0/28',
      b: '10.10.13.0/25',
      c: '10.10.13.144/28',
      d: '10.10.13.208/29'
    },
    answer: 'd',
    explanation: 'Based on the network topology shown, Router1 uses the most specific prefix 10.10.13.208/29 for traffic to Host A.'
  },
  {
    no: "examtopic_Q3",
    type: 'DAD',
    topic: '',
    question: {
      question: 'Drag and drop the descriptions of file-transfer protocols from the left onto the correct protocols on the right.',
      image: '../images/CCNA/exam_topic_Q3.png'
    },
    answer: '../images/CCNA/exam_topic_A3.png',
    explanation: 'The image shows the correct mapping between file-transfer protocols and their descriptions.'
  },
  {
    no: "examtopic_Q4",
    type: 'M',
    topic: '',
    question: 'A frame that enters a switch fails the Frame Check Sequence. Which two interface counters are incremented? (Choose two.)',
    choices: {
      a: 'Input errors',
      b: 'Frame',
      c: 'Giants', 
      d: 'CRC',
      e: 'Runts'
    },
    answer: ['a', 'd'],
    explanation: 'When a frame fails the Frame Check Sequence (FCS), both the input errors counter and the CRC (Cyclic Redundancy Check) counter are incremented.'
  },
  {
    no: "examtopic_Q5",
    type: 'DAD',
    topic: '',
    question: {
      question: 'Drag and drop the IPv4 network subnets from the left onto the correct usable host ranges on the right.',
      image: '../images/CCNA/exam_topic_Q5.png'
    },
    answer: '../images/CCNA/exam_topic_A5.png',
    explanation: 'The image shows the correct mapping between IPv4 network subnets and their usable host ranges.'
  },
  {
    no: "examtopic_Q6",
    type: 'M',
    topic: '',
    question: 'How do TCP and UDP differ in the way that they establish a connection between two endpoints?',
    choices: {
      a: 'TCP uses the three-way handshake, and UDP does not guarantee message delivery.',
      b: 'TCP uses synchronization packets, and UDP uses acknowledgment packets.',
      c: 'UDP provides reliable message transfer, and TCP is a connectionless protocol.',
      d: 'UDP uses SYN, SYN ACK, and FIN bits in the frame header while TCP uses SYN, SYN ACK, and ACK bits.'
    },
    answer: 'a',
    explanation: 'TCP uses a three-way handshake (SYN, SYN-ACK, ACK) to establish connections and ensure reliable delivery, while UDP is connectionless and does not guarantee message delivery.'
  },
  {
    no: "examtopic_Q7",
    type: 'M',
    topic: '',
    question: 'Which 802.11 frame type is Association Response?',
    choices: {
      a: 'Management',
      b: 'Protected frame',
      c: 'Action',
      d: 'Control'
    },
    answer: 'a',
    explanation: 'Association Response frames are Management frames in 802.11 wireless networks. They are used to complete the association process between a wireless client and an access point.'
  },

  {
    no: "examtopic_Q9",
    type: 'M',
    topic: '',
    question: 'What identifies the functionality of virtual machines?',
    choices: {
      a: 'The hypervisor communicates on Layer 3 without the need for additional resources.',
      b: 'Each hypervisor supports a single virtual machine and a single software switch.',
      c: 'The hypervisor virtualizes physical components including CPU, memory, and storage.',
      d: 'Virtualized servers run efficiently when physically connected to a switch that is separate from the hypervisor.'
    },
    answer: 'c',
    explanation: 'The key functionality of virtual machines is that the hypervisor virtualizes physical hardware components (CPU, memory, storage) to create multiple virtual instances on a single physical host.'
  },
  {
    no: "examtopic_Q10",
    type: 'M',
    topic: '',
    question: 'Which command automatically generates an IPv6 address from a specified IPv6 prefix and MAC address of an interface?',
    choices: {
      a: 'ipv6 address dhcp',
      b: 'ipv6 address 2001:DB8:5:112::/64 eui-64',
      c: 'ipv6 address autoconfig',
      d: 'ipv6 address 2001:DB8:5:112::2/64 link-local'
    },
    answer: 'b',
    explanation: 'The "ipv6 address prefix eui-64" command automatically generates an IPv6 address by combining the specified prefix with the interface\'s MAC address using the EUI-64 format.'
  },
  {
    no: "examtopic_Q11",
    type: 'M',
    topic: '',
    question: 'When configuring IPv6 on an interface, which two IPv6 multicast groups are joined? (Choose two.)',
    choices: {
      a: '2000::/3',
      b: '2002::5', 
      c: 'FC00::/7',
      d: 'FF02::1',
      e: 'FF02::2'
    },
    answer: ['d', 'e'],
    explanation: 'When IPv6 is enabled on an interface, it automatically joins the all-nodes multicast group (FF02::1) and the all-routers multicast group (FF02::2).'
  },
  {
    no: "examtopic_Q12",
    type: 'DAD',
    topic: '',
    question: {
      question: 'Drag and drop the descriptions of file-transfer protocols from the left onto the correct protocols on the right.',
      image: '../images/CCNA/exam_topic_Q12.png'
    },
    answer: '../images/CCNA/exam_topic_A12.png',
    explanation: 'This drag-and-drop question tests knowledge of different file transfer protocols and their characteristics.'
  },
  {
    no: "examtopic_Q13",
    type: 'M',
    topic: '',
    question: 'What is the default behavior of a Layer 2 switch when a frame with an unknown destination MAC address is received?',
    choices: {
      a: 'The Layer 2 switch forwards the packet and adds the destination MAC address to its MAC address table.',
      b: 'The Layer 2 switch sends a copy of a packet to CPU for destination MAC address learning.',
      c: 'The Layer 2 switch floods packets to all ports except the receiving port in the given VLAN.',
      d: 'The Layer 2 switch drops the received frame.'
    },
    answer: 'c',
    explanation: 'When a Layer 2 switch receives a frame with an unknown destination MAC address, it floods the frame to all ports in the same VLAN except the port it was received on. This is known as unknown unicast flooding.'
  },
  {
    no: "examtopic_Q14",
    type: 'M',
    topic: '',
    question: 'An engineer must configure a /30 subnet between two routes. Which usable IP address and subnet mask combination meets this criteria?',
    choices: {
      a: 'interface e0/0 description to XX-AXXX:XXXXX ip address 10.2.1.3 255.255.255.252',
      b: 'interface e0/0 description to XX-AXXX:XXXXX ip address 192.168.1.1 255.255.255.248',
      c: 'interface e0/0 description to XX-AXXX:XXXXX ip address 172.16.1.4 255.255.255.248',
      d: 'interface e0/0 description to XX-AXXX:XXXXX ip address 209.165.201.2 225.255.255.252'
    },
    answer: 'd',
    explanation: 'A /30 subnet uses a 255.255.255.252 subnet mask and provides 2 usable host addresses, which is perfect for point-to-point links between two routers.'
  },
  {
    no: "examtopic_Q15",
    type: 'M',
    topic: '',
    question: 'Which network allows devices to communicate without the need to access the Internet?',
    choices: {
      a: '172.9.0.0/16',
      b: '172.28.0.0/16',
      c: '192.0.0.0/8',
      d: '209.165.201.0/24'
    },
    answer: 'b',
    explanation: '172.28.0.0/16 is part of the private IP address range (172.16.0.0 - 172.31.255.255) which is designed for internal network communication without Internet access.'
  },

  {
    no: "examtopic_Q17",
    type: 'M',
    topic: '',
    question: 'Which IPv6 address type provides communication between subnets and cannot route on the Internet?',
    choices: {
      a: 'Link-local',
      b: 'Unique local',
      c: 'Multicast',
      d: 'Global unicast'
    },
    answer: 'b',
    explanation: 'Unique local addresses (ULA) are used for local communications within a site or between subnets. They are not routable on the Internet, similar to private IPv4 addresses.'
  },
  {
    no: "examtopic_Q18",
    type: 'M',
    topic: '',
    question: 'Which IPv6 address block sends packets to a group address rather than a single address?',
    choices: {
      a: '2000::/3',
      b: 'FC00::/7',
      c: 'FE80::/10',
      d: 'FF00::/8'
    },
    answer: 'd',
    explanation: 'The FF00::/8 prefix is reserved for IPv6 multicast addresses, which are used to send packets to multiple destinations simultaneously.'
  },
  {
    no: "examtopic_Q19",
    type: 'M',
    topic: '',
    question: 'What are two reasons that cause late collisions to increment on an Ethernet interface? (Choose two.)',
    choices: {
      a: 'when Carrier Sense Multiple Access/Collision Detection is used',
      b: 'when one side of the connection is configured for half-duplex',
      c: 'when the sending device waits 15 seconds before sending the frame again',
      d: 'when a collision occurs after the 32nd byte of a frame has been transmitted',
      e: 'when the cable length limits are exceeded'
    },
    answer: ['b', 'e'],
    explanation: 'Late collisions occur when one side is configured for half-duplex (causing timing issues) and when cable length limits are exceeded (causing signal propagation delays).'
  },
  {
    no: "examtopic_Q20",
    type: 'M',
    topic: '',
    question: 'What is a benefit of using a Cisco Wireless LAN Controller?',
    choices: {
      a: 'It eliminates the need to configure each access point individually.',
      b: 'Central AP management requires more complex configurations.',
      c: 'Unique SSIDs cannot use the same authentication method.',
      d: 'It supports autonomous and lightweight APs.'
    },
    answer: 'a',
    explanation: 'A key benefit of using a Cisco WLC is centralized management, eliminating the need to configure each access point individually, which saves time and reduces configuration errors.'
  }

];

