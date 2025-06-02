
const listOfType = {
  M: 'Multiple Choice',
  MWI: "Multiple Choice With Image",
  DAD: 'Drag and Drop'
};
document.getElementById('subject-title').innerText = 'CCNA 200 - 301';
document.getElementById('sidebar-subject-title').innerText = 'CCNA 200 - 301';

const topics = {
  0: 'ALL',
  //1: 'MATHEMATICS',
  //2 : 'VERBAL ABILITY',
  //2.1 : 'Word Meaning',
  //2.2: 'Sentence Completion',
  //2.3: 'Antonyms',
  //3 : 'FILIPINO',
  //4: 'PHILIPPINE CONSTITUTION',
  //5 : 'INDUCTIVE REASONING',
  //6 : 'ABSTRACT REASONING',
  //7 : 'LOGICAL REASONING'
}

const sideBarContainer = document.getElementById("topicLinks"); // The container where links will be inserted

Object.entries(topics).forEach(([key, value]) => {
  const a = document.createElement("a");
  a.href = `../library/practiceExam.html?page=1&subject=ccna_200_301&topic=${key}`;
  a.id = `topic-${key}`;
  a.className = `w3-bar-item w3-button w3-padding `;
  a.innerHTML = `<img src="" class="notepadIcon">${value}`;
  sideBarContainer.appendChild(a);
});


const practiceTest = document.createElement("a");
practiceTest.href = `../library/quiz.html?page=1&subject=ccna_200_301&topic=`;
practiceTest.className = `w3-bar-item w3-button w3-padding topic-quiz`;
practiceTest.innerHTML = `<img src="" class="notepadIcon">PRACTICE QUIZ (FLASHCARD)`;
sideBarContainer.appendChild(practiceTest);

/*
const questions = [
  {
    no: 1,
    type: 'M',
    topic: '',
    question: 'Which of the following frames does a switch flood? (select two)',
    choices: {
      a: 'A frame destined for one host, with an entry in the ARP table.',
      b: 'A frame with destination MAC FF:FF:FF:FF:FF:FF.',
      c: 'A frame destined for one host, with an entry in the CAM table.',
      d: 'A frame destined for one host, with no entry in the CAM table.',
      e: 'A frame destined for one host, with no entry in the ARP table.'
    },
    answer: ['b', 'd'],
    explanation: 'A switch floods frames with destination MAC FF:FF:FF:FF:FF:FF (broadcast) and frames destined for a host with no entry in the CAM table.'
  },
  {
    no: 2,
    type: 'M',
    topic: '',
    question: 'Which of the following IP addresses are in a range specified by RFC 1918? (select two)',
    choices: {
      a: '224.0.0.10',
      b: '241.255.255.1',
      c: '172.32.0.1',
      d: '192.0.0.1',
      e: '192.168.255.255',
      f: '172.31.23.27'
    },
    answer: ['e', 'f'],
    explanation: '192.168.255.255 and 172.31.23.27 are within the RFC 1918 private address ranges.'
  },
  {
    no: 3,
    type: 'MWI',
    topic: '',
    question: {
      image: '../images/CCNA/Question_3.png',
      question: 'Download the attached .pkt file and open it in Packet Tracer (version 8.2.0 or above required to open the file).<br><br>Which of the following statements are true? (select three)'
    },
    choices: {
      a: "R4's G0/1 interface has an IP address of 10.0.0.2.",
      b: "R3's G0/1 interface is connected to R4's G0/2 interface.",
      c: "R5's G0/3/0 interface is connected to R3's G0/2/0 interface.",
      d: "SW1's G0/2 interface is connected to R2's G0/1 interface.",
      e: "R5's G0/1/0 interface is connected to R4's G0/0/0 interface.",
      f: "R5's G0/2/0 interface has an IP address of 203.0.113.1."
    },
    answer: ['a', 'd', 'e'],
    explanation: 'The correct answers are based on the Packet Tracer topology and interface assignments.'
  },
  {
    no: 4,
    type: 'M',
    topic: '',
    question: 'R1 learns the following routes via dynamic routing protocols:<br><br>192.168.0.0/25 via RIP, metric 4<br>192.168.0.0/30 via EIGRP, metric 1234<br>192.168.0.0/28 via OSPF, metric 10<br>192.168.0.0/16 via eBGP, metric 1<br>An admin also configured a static route to 192.0.0.0/8.<br><br>Which route(s) will R1 add to its routing table? (select all correct answers)',
    choices: {
      a: '192.168.0.0/25',
      b: '192.168.0.0/30',
      c: '192.168.0.0/28',
      d: '192.168.0.0/16',
      e: '192.0.0.0/8'
    },
    answer: ['a', 'b', 'c', 'd', 'e'],
    explanation: 'All listed routes will be added to the routing table as they are the most specific or valid for their respective prefixes.'
  },
  {
    no: 5,
    type: 'MWI',
    topic: '',
    question: {
      image: '../images/CCNA/Question_5.png',
      question: 'Examine the below JSON-formatted data.<br><br>Which of the following statements is true?'
    },
    choices: {
      a: 'A curly bracket is missing.',
      b: 'A square bracket is missing.',
      c: 'It is valid JSON data.',
      d: 'The value of "version" is a string.'
    },
    answer: 'a',
    explanation: 'A curly bracket is missing in the provided JSON data.'
  },
  {
    no: 6,
    type: 'M',
    topic: '',
    question: 'In Dynamic NAT, which command is used to define the traffic that should be translated?',
    choices: {
      a: 'The R1(config)# ip nat inside source ... command.',
      b: 'The R1(config)# access-list ... command.',
      c: 'The R1(config)# ip nat pool ... command',
      d: 'The R1(config-if)# ip nat inside command'
    },
    answer: 'b',
    explanation: 'The access-list command is used to define which traffic should be translated in Dynamic NAT.'
  },
  {
    no: 7,
    type: 'M',
    topic: '',
    question: 'Which of the following commands will not result in an interface being disabled, but will generate Syslog messages when a violation occurs?',
    choices: {
      a: 'switchport port-security violation shutdown',
      b: 'switchport port-security violation protect',
      c: 'switchport port-security violation restrict',
      d: 'switchport port-security violation log'
    },
    answer: 'c',
    explanation: 'The restrict option generates Syslog messages on violations while keeping the interface enabled.'
  },
  {
    no: 8,
    type: 'M',
    topic: '',
    question: 'Which of the following commands will configure a host route? (select all correct answers)',
    choices: {
      a: 'ip route 192.168.1.128 255.255.255.128 10.0.0.1',
      b: 'ip route 192.168.1.1 255.255.255.255 172.16.2.1 150',
      c: 'ip route 203.0.113.127 255.255.255.255 172.16.2.1',
      d: 'ip route 0.0.0.0 0.0.0.0 10.0.0.1'
    },
    answer: ['b', 'c'],
    explanation: 'Host routes are configured with a subnet mask of 255.255.255.255 (/32).'
  },
  {
    no: 9,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about traditional networks and controller-based networking are true? (select two)',
    choices: {
      a: 'Controller-based networking separates the data plane and the control plane.',
      b: 'Controller-based networking eliminates human error.',
      c: 'Traditional networking centralizes the control plane.',
      d: 'Only controller-based networking uses tunnels.',
      e: 'Only controller-based networking centrally monitors events in the network.',
      f: 'Traditional networks use a distributed control plane.'
    },
    answer: ['a', 'f'],
    explanation: 'Controller-based networking separates control and data planes, while traditional networks use a distributed control plane architecture.'
  },
  {
    no: 10,
    type: 'MWI',
    topic: '',
    question: {
      image: '../images/CCNA/Question_10.png',
      question: 'Examine the network diagram below. All switches are running Rapid PVST+.<br><br>Which of the following statements are true? (select three)'
    },
    choices: {
      a: "The role of SW3's F0/1 interface is 'Root'.",
      b: "The link type of the connection between SW3 G0/1 and SW4 G0/2 is 'point-to-point'.",
      c: "The role of SW2's G0/3 interface is 'Alternate'.",
      d: "The role of SW3's G0/2 interface is 'Root'.",
      e: "The role of SW4's G0/2 interface is 'Alternate'.",
      f: "The role of SW1's G0/2 interface is 'Alternate'."
    },
    answer: ['b', 'c', 'd'],
    explanation: 'The correct interface roles and link types are determined by the Rapid PVST+ protocol configuration and topology.'
  },
  {
    no: examtopics.com_question_1,
    type: 'MWI',
    topic: '',
    question: {
      image: '../images/CCNA/.png',
      question: ''
    },
    choices: {
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
    },
    answer: ['b', 'c', 'd'],
    explanation: ''
  }
];
*/

var questions = [
  {
    no: 6,
    type: 'M',
    topic: '',
    question: 'In Dynamic NAT, which command is used to define the traffic that should be translated?',
    choices: {
      a: 'The R1(config)# ip nat inside source ... command.',
      b: 'The R1(config)# access-list ... command.',
      c: 'The R1(config)# ip nat pool ... command',
      d: 'The R1(config-if)# ip nat inside command'
    },
    answer: 'b',
    explanation: 'The access-list command is used to define which traffic should be translated in Dynamic NAT.'
  },
  {
    no: "examtopic_Q8",
    type: 'M',
    topic: '',
    question: 'In which way does a spine-and-leaf architecture allow for scalability in a network when additional access ports are required?',
    choices: {
      a: 'A spine switch and a leaf switch can be added with redundant connections between them.',
      b: 'A spine switch can be added with at least 40 GB uplinks.',
      c: 'A leaf switch can be added with connections to every spine switch.',
      d: 'A leaf switch can be added with a single connection to a core spine switch.'
    },
    answer: 'c',
    explanation: 'In a spine-and-leaf architecture, scalability is achieved by adding leaf switches with connections to all spine switches, maintaining the full mesh topology between spine and leaf layers.'
  },
  {
    no: 22,
    type: 'M',
    topic: '',
    question: 'Which of the following commands configures the router to be a stratum 8 NTP server?',
    choices: {
      a: 'ntp master',
      b: 'ntp server 8',
      c: 'ntp server 216.239.35.4',
      d: 'ntp master stratum 8'
    },
    answer: ['a'],
    explanation: 'The "ntp master" command configures the router as an NTP master with a default stratum of 8.'
  },
  {
    no: 2,
    type: 'M',
    topic: '',
    question: 'Which of the following IP addresses are in a range specified by RFC 1918? (select two)',
    choices: {
      a: '224.0.0.10',
      b: '241.255.255.1',
      c: '172.32.0.1',
      d: '192.0.0.1',
      e: '192.168.255.255',
      f: '172.31.23.27'
    },
    answer: ['e', 'f'],
    explanation: '192.168.255.255 and 172.31.23.27 are within the RFC 1918 private address ranges.'
  },
  {
    no: 16,
    type: 'M',
    topic: '',
    question: 'Which type of API is used for communications between a controller and the network devices?',
    choices: {
      a: 'Underlay',
      b: 'REST',
      c: 'Northbound',
      d: 'Southbound'
    },
    answer: ['d'],
    explanation: 'Southbound APIs are used for communication between controllers and network devices.'
  },
    {
    no: "examtopic_Q16",
    type: 'MWI',
    topic: '',
    question: [
      {question: 'Refer to the exhibit. Which statement explains the configuration error message that is received?'},
      {image: '../images/CCNA/exam_topic_Q16.png'}
    ],
    choices: {
      a: 'It belongs to a private IP address range.',
      b: 'The router does not support /28 mask.',
      c: 'It is a network IP address.',
      d: 'It is a broadcast IP address'
    },
    answer: 'd',
    explanation: 'The error message is received because the IP address being configured is the broadcast address for that subnet, which cannot be assigned to an interface.'
  },

















  //-----------------------------------------------------
  {
    no: 1,
    type: 'M',
    topic: '',
    question: 'Which of the following frames does a switch flood? (select two)',
    choices: {
      a: 'A frame destined for one host, with an entry in the ARP table.',
      b: 'A frame with destination MAC FF:FF:FF:FF:FF:FF.',
      c: 'A frame destined for one host, with an entry in the CAM table.',
      d: 'A frame destined for one host, with no entry in the CAM table.',
      e: 'A frame destined for one host, with no entry in the ARP table.'
    },
    answer: ['b', 'd'],
    explanation: 'A switch floods frames with destination MAC FF:FF:FF:FF:FF:FF (broadcast) and frames destined for a host with no entry in the CAM table.'
  },

  {
    no: 3,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Download the attached .pkt file and open it in Packet Tracer (version 8.2.0 or above required to open the file).<br><br>Which of the following statements are true? (select three)' },
      { image: '../images/CCNA/Question_3.png' },
      { question: 'Which of the following statements are true? (select three)' }
    ],
    choices: {
      a: "R4's G0/1 interface has an IP address of 10.0.0.2.",
      b: "R3's G0/1 interface is connected to R4's G0/2 interface.",
      c: "R5's G0/3/0 interface is connected to R3's G0/2/0 interface.",
      d: "SW1's G0/2 interface is connected to R2's G0/1 interface.",
      e: "R5's G0/1/0 interface is connected to R4's G0/0/0 interface.",
      f: "R5's G0/2/0 interface has an IP address of 203.0.113.1."
    },
    answer: ['a', 'd', 'e'],
    explanation: 'The correct answers are based on the Packet Tracer topology and interface assignments.'
  },
  {
    no: 4,
    type: 'M',
    topic: '',
    question: 'R1 learns the following routes via dynamic routing protocols:<br><br>192.168.0.0/25 via RIP, metric 4<br>192.168.0.0/30 via EIGRP, metric 1234<br>192.168.0.0/28 via OSPF, metric 10<br>192.168.0.0/16 via eBGP, metric 1<br>An admin also configured a static route to 192.0.0.0/8.<br><br>Which route(s) will R1 add to its routing table? (select all correct answers)',
    choices: {
      a: '192.168.0.0/25',
      b: '192.168.0.0/30',
      c: '192.168.0.0/28',
      d: '192.168.0.0/16',
      e: '192.0.0.0/8'
    },
    answer: ['a', 'b', 'c', 'd', 'e'],
    explanation: 'All listed routes will be added to the routing table as they are the most specific or valid for their respective prefixes.'
  },
  {
    no: 5,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the below JSON-formatted data.' },
      { image: '../images/CCNA/Question_5.png' },
      { question: 'Which of the following statements is true?' }
    ],
    choices: {
      a: 'A curly bracket is missing.',
      b: 'A square bracket is missing.',
      c: 'It is valid JSON data.',
      d: 'The value of "version" is a string.'
    },
    answer: 'a',
    explanation: 'A curly bracket is missing in the provided JSON data.'
  },

  {
    no: 7,
    type: 'M',
    topic: '',
    question: 'Which of the following commands will not result in an interface being disabled, but will generate Syslog messages when a violation occurs?',
    choices: {
      a: 'switchport port-security violation shutdown',
      b: 'switchport port-security violation protect',
      c: 'switchport port-security violation restrict',
      d: 'switchport port-security violation log'
    },
    answer: 'c',
    explanation: 'The restrict option generates Syslog messages on violations while keeping the interface enabled.'
  },
  {
    no: 8,
    type: 'M',
    topic: '',
    question: 'Which of the following commands will configure a host route? (select all correct answers)',
    choices: {
      a: 'ip route 192.168.1.128 255.255.255.128 10.0.0.1',
      b: 'ip route 192.168.1.1 255.255.255.255 172.16.2.1 150',
      c: 'ip route 203.0.113.127 255.255.255.255 172.16.2.1',
      d: 'ip route 0.0.0.0 0.0.0.0 10.0.0.1'
    },
    answer: ['b', 'c'],
    explanation: 'Host routes are configured with a subnet mask of 255.255.255.255 (/32).'
  },
  {
    no: 9,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about traditional networks and controller-based networking are true? (select two)',
    choices: {
      a: 'Controller-based networking separates the data plane and the control plane.',
      b: 'Controller-based networking eliminates human error.',
      c: 'Traditional networking centralizes the control plane.',
      d: 'Only controller-based networking uses tunnels.',
      e: 'Only controller-based networking centrally monitors events in the network.',
      f: 'Traditional networks use a distributed control plane.'
    },
    answer: ['a', 'f'],
    explanation: 'Controller-based networking separates control and data planes, while traditional networks use a distributed control plane architecture.'
  },
  {
    no: 10,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the network diagram below. All switches are running Rapid PVST+.' },
      { image: '../images/CCNA/Question_10.png' },
      { question: 'Which of the following statements are true? (select three)' }
    ],
    choices: {
      a: "The role of SW3's F0/1 interface is 'Root'.",
      b: "The link type of the connection between SW3 G0/1 and SW4 G0/2 is 'point-to-point'.",
      c: "The role of SW2's G0/3 interface is 'Alternate'.",
      d: "The role of SW3's G0/2 interface is 'Root'.",
      e: "The role of SW4's G0/2 interface is 'Alternate'.",
      f: "The role of SW1's G0/2 interface is 'Alternate'."
    },
    answer: ['b', 'c', 'd'],
    explanation: 'The correct interface roles and link types are determined by the Rapid PVST+ protocol configuration and topology.'
  },
  {
    no: 11,
    type: 'M',
    topic: '',
    question: 'Which of the following cloud service models provides the most control to the customer?',
    choices: {
      a: 'PaaS',
      b: 'IaaS',
      c: 'SaaS'
    },
    answer: ['b'],
    explanation: 'IaaS (Infrastructure as a Service) provides the most control to the customer over the infrastructure.'
  },
  {
    no: 12,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about FTP and TFTP are true? (select three)',
    choices: {
      a: 'FTP requires authentication.',
      b: 'FTP uses UDP.',
      c: 'TFTP uses UDP.',
      d: 'TFTP uses ports 20 and 21.',
      e: 'TFTP uses port 69.',
      f: 'TFTP requires authentication.'
    },
    answer: ['a', 'c', 'e'],
    explanation: 'FTP requires authentication, TFTP uses UDP, and TFTP uses port 69.'
  },
  {
    no: 13,
    type: 'M',
    topic: '',
    question: 'Which WLAN QoS setting is defined as Best Effort?',
    choices: {
      a: 'Platinum',
      b: 'Gold',
      c: 'Silver',
      d: 'Bronze'
    },
    answer: ['c'],
    explanation: 'Silver is defined as Best Effort in WLAN QoS settings.'
  },
  {
    no: 14,
    type: 'M',
    topic: '',
    question: "R1's G0/1 is configured with IP address 10.20.20.1/24.\nR1's G0/2 is configured with IP address 10.20.21.1/24.\nWhich of the following commands will activate OSPF on both interfaces with a single command?",
    choices: {
      a: 'network 10.20.20.0 0.0.0.255 area 0',
      b: 'network 10.20.21.0 0.0.0.255 area 0',
      c: 'network 10.20.16.0 0.0.7.255 area 0',
      d: 'network 10.20.20.0 0.0.0.127 area 0'
    },
    answer: ['c'],
    explanation: 'The command "network 10.20.16.0 0.0.7.255 area 0" covers both 10.20.20.0/24 and 10.20.21.0/24 subnets.'
  },
  {
    no: 15,
    type: 'M',
    topic: '',
    question: 'Which of the following is an example of MFA?',
    choices: {
      a: 'You swipe a key card and then do a fingerprint scan.',
      b: 'You do a retina scan and then do a finger print scan.',
      c: 'You swipe a key card and then touch your phone to a panel.',
      d: 'You enter a username/password. On the next screen you enter a PIN.'
    },
    answer: ['a'],
    explanation: 'MFA (Multi-Factor Authentication) requires two or more different types of authentication factors. Option A uses something you have (key card) and something you are (fingerprint).'
  },

  {
    no: 17,
    type: 'M',
    topic: '',
    question: 'In which of the following 802.11 standards can channel selection be important to avoid overlapping channels? (select four)',
    choices: {
      a: '802.11',
      b: '802.11a',
      c: '802.11b',
      d: '802.11g',
      e: '802.11n',
      f: '802.11ac'
    },
    answer: ['a', 'c', 'd', 'e'],
    explanation: 'Channel selection is important in 802.11, 802.11b, 802.11g, and 802.11n to avoid overlapping channels, especially in the 2.4 GHz band.'
  },
  {
    no: 18,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the chart of switchport mode combinations below.' },
      { image: '../images/CCNA/Question_18.png' },
      { question: 'Which of the following options correctly represent the resulting operational modes of the corresponding switchport mode combinations? (select all correct answers)' }
    ],
    choices: {
      a: 'Trunk',
      b: 'Access',
      c: 'Access',
      d: 'Access',
      e: 'Trunk'
    },
    answer: ['a', 'b'],
    explanation: 'Options A (Trunk) and B (Access) are the correct resulting operational modes for the given switchport mode combinations.'
  },
  {
    no: 19,
    type: 'M',
    topic: '',
    question: 'Which of the following WPA3 features provides superior security over WPA2?',
    choices: {
      a: 'CCMP',
      b: '802.1X',
      c: 'SAE',
      d: 'PSK'
    },
    answer: ['c'],
    explanation: 'SAE (Simultaneous Authentication of Equals) is a WPA3 feature that provides superior security over WPA2.'
  },
  {
    no: 20,
    type: 'M',
    topic: '',
    question: 'In a traditional three-tier campus LAN design, which of the following features would you expect to find in the Access Layer? (select three)',
    choices: {
      a: 'WAN connection',
      b: 'QoS Marking',
      c: 'Border between L2 and L3',
      d: 'Internet connection',
      e: 'Port Security',
      f: 'PoE'
    },
    answer: ['b', 'e'],
    explanation: 'QoS Marking, Port Security, and PoE are features commonly found in the Access Layer of a three-tier campus LAN design.'
  },
  {
    no: 21,
    type: 'M',
    topic: '',
    question: 'You are configuring an EtherChannel connecting SW1 and SW2. Which of the following EtherChannel mode combinations will result in a valid EtherChannel? (select two)',
    choices: {
      a: 'channel-group 1 mode on on SW1 and channel-group 1 mode passive on SW2.',
      b: 'channel-group 1 mode active on SW1 and channel-group 1 mode passive on SW2.',
      c: 'channel-group 1 mode desirable on SW1 and channel-group 1 mode auto on SW2.',
      d: 'channel-group 1 mode active on SW1 and channel-group 1 mode desirable on SW2.',
      e: 'channel-group 1 mode active on SW1 and channel-group 1 mode auto on SW2.',
      f: 'channel-group 1 mode desirable on SW1 and channel-group 1 mode passive on SW2.'
    },
    answer: ['b', 'c'],
    explanation: 'The combinations "active/passive" (LACP) and "desirable/auto" (PAgP) will result in a valid EtherChannel.'
  },

  {
    no: 23,
    type: 'M',
    topic: '',
    question: 'Which of the following is a valid VRRP virtual MAC address?',
    choices: {
      a: '00:00:0c:07:ac:01',
      b: '00:00:5e:00:01:a0',
      c: '00:00:0c:9f:f0:01',
      d: '00:07:b4:00:01:02'
    },
    answer: ['b'],
    explanation: '00:00:5e:00:01:a0 is the correct format for a VRRP virtual MAC address.'
  },
  {
    no: 24,
    type: 'M',
    topic: '',
    question: 'Which of the following must match for two routers to become OSPF neighbors? (select three)',
    choices: {
      a: 'Area number',
      b: 'Interface ID',
      c: 'Router ID',
      d: 'Hello and Dead timers',
      e: 'IP address',
      f: 'Subnet'
    },
    answer: ['a', 'd', 'f'],
    explanation: 'Area number, Hello and Dead timers, and Subnet must match for OSPF neighbors to form.'
  },
  {
    no: 25,
    type: 'M',
    topic: '',
    question: 'Which of the following Application Layer protocols use TCP to provide reliable communications? (select three)',
    choices: {
      a: 'FTP',
      b: 'HTTPS',
      c: 'Telnet',
      d: 'TFTP',
      e: 'DHCP',
      f: 'Syslog'
    },
    answer: ['a', 'b', 'c'],
    explanation: 'FTP, HTTPS, and Telnet use TCP for reliable communications.'
  },
  {
    no: 26,
    type: 'M',
    topic: '',
    question: "You can configure SW1's F0/5 interface with the following commands:<br><br>SW1(config-if)# switchport access vlan 10<br>SW1(config-if)# switchport mode access<br><br>Which command can you configure on the interface to allow it to also carry traffic in VLAN 20, without configuring it as a trunk port?",
    choices: {
      a: 'switchport trunk native vlan 20',
      b: 'switchport access vlan add 20',
      c: 'switchport voice vlan 20',
      d: 'switchport access native vlan 20'
    },
    answer: ['c'],
    explanation: 'The "switchport voice vlan 20" command allows the port to carry both access and voice VLANs without making it a trunk.'
  },
  {
    no: 27,
    type: 'M',
    topic: '',
    question: "You issue the following commands on R1:<br><br>R1(config)# enable password ccna1<br>R1(config)# enable secret ccna2<br>R1(config)# username jeremy secret ccna3<br>R1(config)# line console 0<br>R1(config-line)# password ccna4<br>R1(config-line)# login<br><br>When connecting to the console port of R1, which username and/or password will you have to use to access the CLI?",
    choices: {
      a: 'password: ccna1',
      b: 'password: ccna2',
      c: 'username: jeremy, password: ccna3',
      d: 'password: ccna4'
    },
    answer: ['d'],
    explanation: 'The console port uses the password configured under line console 0, which is ccna4.'
  },
  {
    no: 28,
    type: 'M',
    topic: '',
    question: 'Which WLC interface is dedicated for OOB management?',
    choices: {
      a: 'dynamic interface',
      b: 'redundancy management interface',
      c: 'management interface',
      d: 'service port interface'
    },
    answer: ['d'],
    explanation: 'The service port interface is dedicated for out-of-band (OOB) management on a WLC.'
  },
  {
    no: 29,
    type: 'MWI',
    topic: '',
    question: [
      { question: "Examine R1's routing table." },
      { image: '../images/CCNA/Question_29.png' },
      { question: 'Which interface will R1 use to forward a packet destined for IP address 198.0.32.1?' }
    ],
    choices: {
      a: 'GigabitEthernet0/0',
      b: 'GigabitEthernet0/1',
      c: 'GigabitEthernet0/2',
      d: 'GigabitEthernet0/3',
      e: 'GigabitEthernet0/4',
      f: 'GigabitEthernet0/5'
    },
    answer: ['f'],
    explanation: 'Based on the routing table, R1 will use GigabitEthernet0/5 to forward packets destined for 198.0.32.1.'
  },
  {
    no: 30,
    type: 'M',
    topic: '',
    question: 'Which of the following statement about configuration management tools are true? (select three)',
    choices: {
      a: 'Ansible connects to managed devices using SSH.',
      b: 'Terraform configuration files are written using a DSL.',
      c: 'Ansible stores configuration variables and their values using YAML.',
      d: 'Puppet and Chef use a push model.',
      e: 'Terraform and Puppet are written in Ruby.',
      f: 'Terraform uses an agent-based approach.'
    },
    answer: ['a', 'b', 'c'],
    explanation: 'Ansible uses SSH, Terraform uses a DSL, and Ansible stores variables in YAML.'
  },
  {
    no: 31,
    type: 'MWI',
    topic: '',
    question: [
      { question: "Examine the network below." },
      { image: '../images/CCNA/Question_31.png' },
      { question: 'Which of the following configurations will enable PC1 to get an IP address from the DHCP server?' }
    ],
    choices: {
      a: "<br>R1(config)# interface g0/0<br>R1(config-if)# ip helper-address 192.168.10.10",
      b: "<br>R1(config)# interface g0/1<br>R1(config-if)# ip address dhcp",
      c: "<br>R1(config)# interface g0/1<br>R1(config-if)# ip helper-address 192.168.10.10",
      d: "<br>R1(config)# ip dhcp pool relay<br>R1(dhcp-config)# server 192.168.10.10"
    },
    answer: ['c'],
    explanation: "The correct configuration is to use the 'ip helper-address' command on the interface facing the client (g0/1) to relay DHCP requests to the DHCP server at 192.168.10.10."
  },
  {
    no: 32,
    type: 'M',
    topic: '',
    question: "What bit pattern is found at the beginning of the IPv6 header?",
    choices: {
      a: "1000",
      b: "0110",
      c: "0100",
      d: "1010"
    },
    answer: ['b'],
    explanation: "The IPv6 header starts with the version field, which is 0110 (binary for 6)."
  },
  {
    no: 33,
    type: 'M',
    topic: '',
    question: "Which of the following commands correctly configures a LAG connected to a WLC?",
    choices: {
      a: "channel-group 1 mode active",
      b: "channel-group 1 mode desirable",
      c: "channel-group 1 mode auto",
      d: "channel-group 1 mode on"
    },
    answer: ['d'],
    explanation: "WLCs require the EtherChannel to be configured in 'on' mode (static LAG)."
  },
  {
    no: 34,
    type: 'M',
    topic: '',
    question: "Which PSK formats are supported when configuring a WLAN with WPA2? (select two)",
    choices: {
      a: "Binary",
      b: "Base64",
      c: "Hexadecimal",
      d: "ASCII"
    },
    answer: ['c', 'd'],
    explanation: "WPA2 supports pre-shared keys in ASCII and Hexadecimal formats."
  },
  {
    no: 35,
    type: 'M',
    topic: '',
    question: "Which of the following is not a valid static route?",
    choices: {
      a: "ipv6 route 2001:db8:0:1::/64 g0/0 fe80::7b7d:2c90:e37d:a260",
      b: "ipv6 route 2001:db8:0:1::/64 serial0/0/0",
      c: "ipv6 route 2001:db8:0:1::/64 fe80::68a7:9389:9807:db9a",
      d: "ipv6 route 2001:db8:0:1::/64 2001:db8:0:2:7b2c:98:1:1ef2"
    },
    answer: ['c'],
    explanation: "When using a link-local next-hop address, the outgoing interface must be specified. Option C omits the interface, making it invalid."
  },
  {
    no: 36,
    type: 'M',
    topic: '',
    question: "R1's interfaces have the following IP addresses:<br><br>G0/1 - 192.168.1.1/24<br>G0/2 - 192.168.2.1/24<br>Loopback1 - 10.10.10.1/32<br>Loopback2 - 10.10.10.2/32<br><br>You configure OSPF on R1 and multiple neighbors come up with FULL adjacencies on the G0/1 and G0/2 interfaces.<br>You then issue the R1(config-router)# router-id 1.1.1.1 command on R1. What will R1's OSPF RID be after that command?",
    choices: {
      a: "192.168.1.1",
      b: "192.168.2.1",
      c: "10.10.10.1",
      d: "10.10.10.2",
      e: "1.1.1.1"
    },
    answer: ['d'],
    explanation: "The OSPF router ID is chosen as the highest IP address on a loopback interface if not manually set. However, if OSPF is already running and neighbors are established, changing the router-id command will not take effect until OSPF is restarted. Thus, the current RID remains 10.10.10.2."
  },
  {
    no: 37,
    type: 'M',
    topic: '',
    question: "What is the 802.11 frame type of association request and response messages?",
    choices: {
      a: "Data",
      b: "Control",
      c: "Management",
      d: "Probe"
    },
    answer: ['c'],
    explanation: "Association request and response frames are management frames in 802.11."
  },
  {
    no: 38,
    type: 'M',
    topic: '',
    question: "Which of the following statements about AAA concepts are true? (select three)",
    choices: {
      a: "Requiring a username/password to log in is an example of Authorization.",
      b: "Granting a user write access to a particular file is an example of Authentication.",
      c: "Authentication verifies the user's identity.",
      d: "Accounting records user activities.",
      e: "Restricting a user's access to a folder is an example of Authorization.",
      f: "Accounting is the process of verifying a user's password."
    },
    answer: ['c', 'd', 'e'],
    explanation: "Authentication verifies identity, accounting records activities, and authorization restricts access to resources."
  },
  {
    no: 39,
    type: 'M',
    topic: '',
    question: "When using Cisco Meraki APs, which traffic is not sent to the controller?",
    choices: {
      a: "Data traffic",
      b: "Configuration traffic",
      c: "Management traffic",
      d: "Monitoring traffic"
    },
    answer: ['a'],
    explanation: "Data traffic is bridged locally and not sent to the Meraki cloud controller."
  },
  {
    no: 40,
    type: 'M',
    topic: '',
    question: "Which of the following commands will use EUI-64? (select two)",
    choices: {
      a: "ipv6 address 2001:db8:0:1::/64 autoconfig",
      b: "ipv6 address 2001:db8:0:1::/64 eui-64",
      c: "ipv6 address autoconfig",
      d: "ipv6 address fe80::/64 link-local"
    },
    answer: ['b', 'c'],
    explanation: "The 'eui-64' and 'autoconfig' options both use EUI-64 to generate the interface identifier."
  },
  {
    no: 41,
    type: 'M',
    topic: '',
    question: "Lab Question<br><br>Download the attached .pka file and open it in Packet Tracer (version 8.2.0 or above required to open the file).<br><br>A) Successfully completed the lab.<br>B) Did not successfully complete the lab.",
    choices: {
      a: "Successfully completed the lab.",
      b: "Did not successfully complete the lab."
    },
    answer: ['a'],
    explanation: "The lab is evaluated by checking for the required IPv6 routing and static route commands in the startup-config of R1 and R2."
  },
  {
    no: 42,
    type: 'M',
    topic: '',
    question: "Which of the following statements about OSPF Broadcast and Point-to-Point networks are true? (select two)",
    choices: {
      a: "Point-to-Point neighbors should appear as FULL/ - in the OSPF neighbor table.",
      b: "Broadcast neighbors should appear as FULL/ - in the OSPF neighbor table.",
      c: "A DR and BDR are elected for Broadcast networks.",
      d: "A DR and BDR are elected for Point-to-Point networks."
    },
    answer: ['a', 'c'],
    explanation: "Point-to-Point OSPF neighbors appear as FULL/-, and DR/BDR are only elected on Broadcast networks."
  },
  {
    no: 43,
    type: 'M',
    topic: '',
    question: "Which of the following statements about the Native VLAN are true? (select two)",
    choices: {
      a: "Each interface on a switch can have a different native VLAN.",
      b: "Router-on-a-Stick connections can't use the native VLAN.",
      c: "The native VLAN is configured with the SW1(config)# switchport trunk native vlan &lt;vlan&gt; command.",
      d: "The native VLAN should match on both sides of a connection."
    },
    answer: ['a', 'd'],
    explanation: "Each trunk interface can have a different native VLAN, and the native VLAN should match on both sides of a trunk link."
  },
  {
    no: 44,
    type: 'MWI',
    topic: '',
    question: [
      { question: "Examine the network below. PC1, PC2, and PC3 have 8.8.8.8 configured as their DNS server. R1 has a default route to the Internet." },
      { image: '../images/CCNA/Question_44.png' },
      { question: "Which of the following configurations are required for PC1, PC2, and PC3 to use the server at 8.8.8.8 to resolve DNS queries?" }
    ],
    choices: {
      a: "R1(config)# interface g0/1<br>R1(config-if)# ip helper-address 8.8.8.8",
      b: "R1(config)# ip host dns.google.com 8.8.8.8",
      c: "ip name-server 8.8.8.8",
      d: "No configurations are needed."
    },
    answer: ['d'],
    explanation: "No additional configuration is needed if the PCs are already configured to use 8.8.8.8 and have connectivity."
  },
  {
    no: 45,
    type: 'M',
    topic: '',
    question: "Which of the following are characteristics of spine-leaf architecture? (select two)",
    choices: {
      a: "Every Spine switch connects to every other Spine switch.",
      b: "Every Spine switch connects to every Leaf switch.",
      c: "End hosts only connect to Spine switches.",
      d: "Leaf switches do not connect to other Leaf switches."
    },
    answer: ['b', 'd'],
    explanation: "In spine-leaf, every spine connects to every leaf, and leaf switches do not connect to each other."
  },
  {
    no: 46,
    type: 'M',
    topic: '',
    question: "Which response code would you expect after a successful REST API call?",
    choices: {
      a: "102",
      b: "200",
      c: "301",
      d: "401"
    },
    answer: ['b'],
    explanation: "HTTP 200 is the standard response code for a successful REST API call."
  },
  {
    no: 47,
    type: 'M',
    topic: '',
    question: "Which of the following protocols is commonly used for a secure Site-to-Site VPN?",
    choices: {
      a: "GRE",
      b: "SSL",
      c: "IPsec",
      d: "TLS"
    },
    answer: ['c'],
    explanation: "IPsec is the standard protocol for secure Site-to-Site VPNs."
  },
  {
    no: 48,
    type: 'MWI',
    topic: '',
    question: [
      { question: "Examine the network below. AP1 and AP2 are lightweight APs controlled by WLC1. FlexConnect is not used in the network. Hosts associated with AP1 and AP2 use SW1's SVI interfaces as their default gateway." },
      { image: '../images/CCNA/Question_48.png' },
      { question: "What path will traffic from PC1 take to reach PC2? Consider the physical path taken by the bits, not the logical path." }
    ],
    choices: {
      a: "PC1 &gt; AP1 &gt; SW1 &gt; WLC1 &gt; SW1 &gt; WLC1 &gt; SW1 &gt; AP2 &gt; PC2",
      b: "PC1 &gt; AP1 &gt; WLC1 &gt; AP2 &gt; PC2",
      c: "PC1 &gt; AP1 &gt; SW1 &gt; WLC1 &gt; SW1 &gt; AP2 &gt; PC2",
      d: "PC1 &gt; AP1 &gt; WLC1 &gt; SW1 &gt; WLC1 &gt; AP2 &gt; PC2"
    },
    answer: ['a'],
    explanation: "Without FlexConnect, all traffic is tunneled to the WLC and back, resulting in the described path."
  },
  {
    no: 49,
    type: 'MWI',
    topic: '',
    question: [
      { question: "PC1 is connected to SW1's G0/1 interface. DHCP Snooping is enabled. The router for the LAN is R1, which also acts as the DHCP server. However, PC1 is unable to receive an IP address via DHCP." },
      { image: '../images/CCNA/Question_49.png' },
      { question: "What command should be used on SW1 to allow PC1 to receive an IP address from R1 via DHCP?" }
    ],
    choices: {
      a: "SW1(config)# ip dhcp snooping information option",
      b: "SW1(config)# no ip dhcp snooping information option",
      c: "SW1(config)# interface g0/1<br>SW1(config-if)# ip dhcp snooping trust",
      d: "SW1(config)# interface g0/1<br>SW1(config-if)# no ip dhcp snooping trust"
    },
    answer: ['b'],
    explanation: "Disabling the DHCP snooping information option resolves the issue with Option 82 insertion."
  },
  {
    no: 50,
    type: 'M',
    topic: '',
    question: "R1 learns the following routes via dynamic routing protocols. Which route(s) will it add to its routing table? (select all correct answers)",
    choices: {
      a: "192.168.0.0/16 via EIGRP, metric 1234",
      b: "192.168.0.0/16 via OSPF, metric 10",
      c: "192.168.0.0/24 via EIGRP, metric 2345",
      d: "192.168.0.0/24 via OSPF, metric 1"
    },
    answer: ['a', 'c'],
    explanation: "The router will install the most specific (longest prefix) routes, and for equal-length prefixes, the protocol with the lowest administrative distance (EIGRP) is preferred."
  },
  {
    no: 51,
    type: 'M',
    topic: '',
    question: "R1 is connected to an OSPF Broadcast network on its G0/0 interface. R2 is the DR of the segment and R3 is the BDR.<br><br>All routers on the segment have the default OSPF priority.<br>You issue the following command on R1’s G0/0:<br><code>R1(config-if)# ip ospf priority 100</code><br><br>Which of the following statements are true? (select two)",
    choices: {
      a: 'R1 is the DR.',
      b: 'R1 is the BDR.',
      c: 'R1 is a DROTHER.',
      d: 'If you issue the clear ip ospf process command on R2, R1 will become the DR.',
      e: 'If you issue the clear ip ospf process command on R2, R1 will become the BDR.'
    },
    answer: ['c', 'e'],
    explanation: 'Changing the priority does not immediately change the DR/BDR status. R1 becomes a DROTHER until a new election occurs. If R2’s OSPF process is reset, R1 becomes the BDR due to its higher priority.'
  },
  {
    no: 52,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about the benefits of network automation are correct? (select two)',
    choices: {
      a: 'Reduced hardware failures.',
      b: 'Reduced CapEx.',
      c: 'Reduced OpEx.',
      d: 'Faster network deployments and changes.'
    },
    answer: ['c', 'd'],
    explanation: 'Network automation helps reduce operational expenses (OpEx) and allows for quicker, more consistent network changes and deployments.'
  },
  {
    no: 53,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the network below.' },
      { image: '../images/CCNA/Question_53.png' },
      { question: 'Which of the following pings will be successful? (select three)' }
    ],
    choices: {
      a: 'PC3# ping 192.168.5.1',
      b: 'PC2# ping 192.168.1.10',
      c: 'R1# ping vrf VRF1 192.168.4.10',
      d: 'R1# ping vrf VRF2 192.168.5.10',
      e: 'PC1# ping 192.168.4.1',
      f: 'R1# ping 192.168.6.10'
    },
    answer: ['c', 'd', 'e'],
    explanation: 'PC3 can ping its gateway (192.168.5.1), PC2 can ping PC1 on the same subnet, and R1 can successfully ping 192.168.5.10 within VRF2. Other paths are either blocked or misconfigured.'
  },
  {
    no: 54,
    type: 'M',
    topic: '',
    question: 'Which of the following commands configure a Rapid-PVST+ Edge port?',
    choices: {
      a: 'SW1(config-if)# spanning-tree link-type edge',
      b: 'SW1(config-if)# spanning-tree rapid edge',
      c: 'SW1(config-if)# spanning-tree edge',
      d: 'SW1(config-if)# spanning-tree portfast'
    },
    answer: 'd',
    explanation: 'PortFast enables a port to immediately enter the forwarding state, which is equivalent to an edge port in Rapid-PVST+.'
  },
  {
    no: 55,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about containers are true? (select two)',
    choices: {
      a: 'Each container runs an OS.',
      b: 'Containers boot up faster than VMs.',
      c: 'Containers use less resources than VMs.',
      d: 'VMware ESXi is an example of a container orchestrator.'
    },
    answer: ['b', 'c'],
    explanation: 'Containers are lightweight and launch faster compared to virtual machines, using fewer resources.'
  },
  {
    no: 56,
    type: 'M',
    topic: '',
    question: 'A router, a WLC, and several LWAPs are connected to SW1. FlexConnect is not being used in the network. Which of the following ports on SW1 should be Access ports? (select two)',
    choices: {
      a: 'The port(s) connected to the WLC\'s distribution ports.',
      b: 'The ports connected to LWAPs.',
      c: 'The port connected to the WLC\'s service port.',
      d: 'The port connected to the router.'
    },
    answer: ['b', 'c'],
    explanation: 'LWAPs and WLC service ports use access ports, while distribution and router links typically use trunking.'
  },
  {
    no: 57,
    type: 'M',
    topic: '',
    question: 'Which of the following WAN technologies would you expect for a SOHO? (select two)',
    choices: {
      a: 'DSL Internet',
      b: 'Cable Internet',
      c: 'Leased Line',
      d: 'MPLS'
    },
    answer: ['a', 'b'],
    explanation: 'DSL and Cable are cost-effective WAN solutions for small offices/home offices.'
  },
  {
    no: 58,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about QoS queuing/congestion management methods are true? (select two)',
    choices: {
      a: 'FIFO forwards packets in the order they are received.',
      b: 'CBWFQ guarantees a minimum amount of bandwidth to specific classes of traffic.',
      c: 'Round-robin scheduling is best used for voice/video traffic.',
      d: 'LLQ is best used for large file transfers.'
    },
    answer: ['a', 'b'],
    explanation: 'FIFO serves in arrival order, and CBWFQ enables bandwidth guarantees per traffic class.'
  },
  {
    no: 59,
    type: 'M',
    topic: '',
    question: 'What IP address do VRRP routers use to communicate with each other?',
    choices: {
      a: '224.0.0.2',
      b: '224.0.0.18',
      c: '224.0.0.102',
      d: 'The VIP'
    },
    answer: 'b',
    explanation: 'VRRP uses the multicast address 224.0.0.18 for communication between routers.'
  },
  {
    no: 60,
    type: 'M',
    topic: '',
    question: 'In the SECURITY tab of a Cisco WLC you configure a CPU Access Control List. Which of the following statements describes the purpose of this ACL?',
    choices: {
      a: 'It controls management traffic destined for the LWAPs.',
      b: 'It controls management traffic destined for the WLC.',
      c: 'It controls traffic forwarded by a dynamic interface.',
      d: 'It controls access to the console port of the WLC.'
    },
    answer: 'b',
    explanation: 'The CPU ACL restricts which management traffic is allowed to reach the WLC itself.'
  },
  {
    no: 61,
    type: 'M',
    topic: '',
    question: 'What of the following DSCP markings indicates a low drop precedence?',
    choices: {
      a: 'AF43',
      b: 'AF32',
      c: 'AF13',
      d: 'AF31'
    },
    answer: ['d'],
    explanation: 'AF31 indicates a low drop precedence among the AFx3 markings.'
  },
  {
    no: 62,
    type: 'M',
    topic: '',
    question: 'Your organization occasionally sends fake phishing emails to employees, luring them to click the links inside. Employees who click on these links find a message telling them to be more cautious about phishing. What element of a security program is this?',
    choices: {
      a: 'User awareness',
      b: 'User training',
      c: 'Email access control',
      d: 'Physical access control'
    },
    answer: ['a'],
    explanation: 'Simulated phishing is a user awareness tactic to educate employees about cybersecurity risks.'
  },
  {
    no: 63,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about EtherChannel are true? (Select two)',
    choices: {
      a: 'The channel-group number has to match for member interfaces on the same switch.',
      b: 'The channel-group number doesn\'t have to match for member interfaces on the same switch.',
      c: 'The channel-group number has to match the channel-group number of the neighbor switch.',
      d: 'The channel-group number doesn\'t have to match the channel-group number of the neighbor switch.'
    },
    answer: ['a', 'd'],
    explanation: 'On the same switch, EtherChannel members must use the same group number. However, this group number does not need to match the neighbor’s group.'
  },
  {
    no: 64,
    type: 'MWI',
    topic: '',
    question: [
      { question: "Examine the output below." },
      { image: '../images/CCNA/Question_64.png' },
      { question: "Which of the following statements are true? (Select three)" }
    ],
    choices: {
      a: 'The interface\'s IPv4 address was manually configured.',
      b: 'The interface\'s OUI is D8-BB-C1.',
      c: 'The interface\'s IPv6 address can\'t be used outside of the local segment.',
      d: 'The command to view this output is ipconfig.',
      e: 'The device will use Google\'s server for name resolution.',
      f: 'The IPv4 address will have to be renewed.'
    },
    answer: ['b', 'c', 'f'],
    explanation: 'The OUI refers to the first three bytes of the MAC, the link-local IPv6 address is local-only, and the autoconfigured IPv4 address will need renewal.'
  },
  {
    no: 65,
    type: 'M',
    topic: '',
    question: 'Which command can be configured to prevent a port from sending STP BPDUs?',
    choices: {
      a: 'spanning-tree guard root',
      b: 'spanning-tree portfast',
      c: 'spanning-tree bpduguard enable',
      d: 'spanning-tree bpdufilter enable'
    },
    answer: ['d'],
    explanation: '`spanning-tree bpdufilter enable` prevents the interface from sending or receiving BPDUs.'
  },
  {
    no: 66,
    type: 'M',
    topic: '',
    question: 'Which of the following subnets and usable host ranges match? (Select two)',
    choices: {
      a: 'Subnet: 10.235.0.0/17, Usable host range: 10.235.0.1 - 10.235.255.254',
      b: 'Subnet: 172.22.128.0/18, Usable host range: 172.22.128.1 - 172.22.191.254',
      c: 'Subnet: 203.29.160.0/21, Usable host range: 203.29.160.1 - 203.29.167.254',
      d: 'Subnet: 192.168.0.0/13, Usable host range: 192.168.0.1 - 192.168.255.254'
    },
    answer: ['b', 'c'],
    explanation: 'Both /18 and /21 subnet ranges listed here match their corresponding host ranges correctly.'
  },
  {
    no: 67,
    type: 'MWI',
    topic: '',
    question: [
      { question: "Examine R1's routing table." },
      { image: '../images/CCNA/Question_67.png' },
      { question: "Which interface will it use to forward a packet destined for 203.0.113.113?" }
    ],
    choices: {
      a: 'GigabitEthernet0/0',
      b: 'GigabitEthernet0/1',
      c: 'GigabitEthernet0/2',
      d: 'GigabitEthernet0/3'
    },
    answer: ['b'],
    explanation: 'According to the routing table, traffic to 203.0.113.113 is forwarded through GigabitEthernet0/1.'
  },
  {
    no: 68,
    type: 'M',
    topic: '',
    question: 'Which type of ML involves training with labeled data sets?',
    choices: {
      a: 'Reinforcement learning',
      b: 'Supervised learning',
      c: 'Unsupervised learning',
      d: 'Deep learning'
    },
    answer: ['b'],
    explanation: 'Supervised learning uses labeled data to train models to predict outcomes.'
  },
  {
    no: 69,
    type: 'M',
    topic: '',
    question: 'Your Cisco router has a password stored using a weak type-7 hash, which can be decrypted easily with an online tool. What is this password an example of?',
    choices: {
      a: 'A threat',
      b: 'A vulnerability',
      c: 'An exploit',
      d: 'A mitigation technique'
    },
    answer: ['b'],
    explanation: 'A weakly hashed password is a vulnerability, as it presents a security risk if exploited.'
  },
  {
    no: 70,
    type: 'M',
    topic: '',
    question: 'Which of the following CRUD action to HTTP verb pairs are correct? (Select two)',
    choices: {
      a: 'CRUD: Create = HTTP: SEND',
      b: 'CRUD: Read = HTTP: OPEN',
      c: 'CRUD: Update = HTTP: PUT, PATCH',
      d: 'CRUD: Delete = HTTP: DELETE'
    },
    answer: ['c', 'd'],
    explanation: 'PUT and PATCH are used for updating resources, and DELETE is used to remove resources via HTTP.'
  },
  {
    no: 71,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about the OSPF point-to-point network type are true? (select two)',
    choices: {
      a: 'A DR and BDR are elected.',
      b: 'It cannot be configured on Ethernet interfaces.',
      c: 'Neighbors are dynamically discovered.',
      d: 'It is enabled on PPP and HDLC interfaces by default.'
    },
    answer: ['c', 'd'],
    explanation: 'On OSPF point-to-point network types, neighbors are dynamically discovered and it is enabled by default on PPP and HDLC interfaces.'
  },
  {
    no: 72,
    type: 'M',
    topic: '',
    question: 'You configure the following IPv6 static route:<br>R1(config)# ipv6 route 2001:db8::1/128 2001:db8:1:1::1234<br>What kind of route is this? (select two)',
    choices: {
      a: 'Network',
      b: 'Recursive',
      c: 'Fully specified',
      d: 'Host',
      e: 'Default',
      f: 'Directly attached'
    },
    answer: ['b', 'd'],
    explanation: 'This is a recursive route (next-hop is an IPv6 address) and a host route (/128).'
  },
  {
    no: 73,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the network diagram below:' },
      { image: '../images/CCNA/Question_73.png' },
      { question: 'You are given the following requirements:<br>1. PC1 can communicate with 192.168.1.0/24, but other devices in 10.0.0.0/24 can\'t.<br>2. PC2 can\'t communicate with 192.168.1.0/24, but other devices in 172.16.0.0/24 can.<br>3. Allow other traffic.<br>Which of the following configurations meets these requirements?' }
    ],
    choices: {
      a: 'R2(config)# ip access-list standard TO_192.168.1.0/24<br>R2(config-std-nacl)# permit host 10.0.0.10<br>R2(config-std-nacl)# deny 10.0.0.0 0.0.0.255<br>R2(config-std-nacl)# deny host 172.16.0.10<br>R2(config-std-nacl)# permit 172.16.0.0 0.0.0.255<br>R2(config-std-nacl)# permit any<br>R2(config-std-nacl)# interface g0/1<br>R2(config-if)# ip access-group TO_192.168.1.0/24 in',
      b: 'R2(config)# ip access-list standard TO_192.168.1.0/24<br>R2(config-std-nacl)# permit host 10.0.0.10<br>R2(config-std-nacl)# deny 10.0.0.0 0.0.0.255<br>R2(config-std-nacl)# deny host 172.16.0.10<br>R2(config-std-nacl)# permit any<br>R2(config-std-nacl)# interface g0/1<br>R2(config-if)# ip access-group TO_192.168.1.0/24 out',
      c: 'R2(config)# ip access-list standard TO_192.168.1.0/24<br>R2(config-std-nacl)# permit host 10.0.0.10<br>R2(config-std-nacl)# deny 10.0.0.0 255.255.255.0<br>R2(config-std-nacl)# deny host 172.16.0.10<br>R2(config-std-nacl)# permit 172.16.0.0 255.255.255.0<br>R2(config-std-nacl)# permit any<br>R2(config-std-nacl)# interface g0/1<br>R2(config-if)# ip access-group TO_192.168.1.0/24 out',
      d: 'R2(config)# ip access-list standard TO_192.168.1.0/24<br>R2(config-std-nacl)# permit host 10.0.0.10<br>R2(config-std-nacl)# deny 10.0.0.0 255.255.255.0<br>R2(config-std-nacl)# deny host 172.16.0.10<br>R2(config-std-nacl)# permit 172.16.0.0 255.255.255.0<br>R2(config-std-nacl)# permit any<br>R2(config-std-nacl)# interface g0/1<br>R2(config-if)# ip access-group TO_192.168.1.0/24 in'
    },
    answer: ['b'],
    explanation: 'Option B applies the correct ACL outbound, matching the requirements for PC1 and PC2.'
  },
  {
    no: 74,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the output of show interfaces f0/1 on SW1 below:' },
      { image: '../images/CCNA/Question_74.png' },
      { question: 'What does the output tell us?' }
    ],
    choices: {
      a: 'SW1 F0/1 has received messages larger than its MTU.',
      b: 'SW1 F0/1 has received broadcast messages in error.',
      c: 'SW1 F0/1 has received messages with an incorrect FCS.',
      d: 'SW1 F0/1 has sent messages that failed the CRC check.'
    },
    answer: ['c'],
    explanation: 'FCS errors indicate that SW1 F0/1 has received messages with an incorrect Frame Check Sequence.'
  },
  {
    no: 75,
    type: 'M',
    topic: '',
    question: 'Which of the following commands configures a directly attached network route?',
    choices: {
      a: 'R1(config)# ip route 172.16.0.0 255.255.0.0 203.0.113.3',
      b: 'R1(config)# ip route 192.168.1.0 255.255.255.0 g0/0 203.0.113.2',
      c: 'R1(config)# ip route 10.0.0.1 255.255.255.255 g0/0',
      d: 'R1(config)# ip route 10.0.0.0 255.255.128.0 g0/0'
    },
    answer: ['d'],
    explanation: 'A directly attached route uses only the exit interface, as in option D.'
  },
  {
    no: 76,
    type: 'M',
    topic: '',
    question: 'R1 G0/0 is connected to SW1 G0/0 using ROAS. The native VLAN of SW1 G0/0 is VLAN 10. Which of the following configurations configures the same native VLAN on R1 G0/0 and configures its IP address? (select two)',
    choices: {
      a: 'R1(config)# interface g0/0.20<br>R1(config-subif)# encapsulation dot1q 10 native<br>R1(config-subif)# ip address 192.168.10.1 255.255.255.0',
      b: 'R1(config)# interface g0/0<br>R1(config-if)# ip address 192.168.10.1 255.255.255.0',
      c: 'R1(config)# interface g0/0<br>R1(config-if)# encapsulation dot1q 10 native<br>R1(config-if)# ip address 192.168.10.1 255.255.255.0',
      d: 'R1(config)# interface g0/0.10<br>R1(config-subif)# encapsulation trunk native vlan 10<br>R1(config-subif)# ip address 192.168.10.1 255.255.255.0'
    },
    answer: ['a', 'b'],
    explanation: 'Option A configures a subinterface with the correct native VLAN, and option B configures the native VLAN IP address on the physical interface.'
  },
  {
    no: 77,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'You configure DHCP Snooping on SW1 as below:' },
      { image: '../images/CCNA/Question_77.png' },
      { question: 'SW1(config)# ip dhcp snooping<br>SW1(config)# no ip dhcp snooping information option<br>SW1(config)# interface g0/0<br>SW1(config-if)# ip dhcp snooping trust<br>However you notice that SW1 does not inspect DHCP messages on its untrusted interfaces. Which of the following is the most likely reason for this?' }
    ],
    choices: {
      a: 'You need to enable DHCP Snooping on the VLAN.',
      b: 'You need to configure G0/1, G0/2, and G0/3 as untrusted ports.',
      c: 'You need to enable Option 82.',
      d: 'You need to activate DHCP Snooping on the interfaces.'
    },
    answer: ['a'],
    explanation: 'DHCP Snooping must be enabled on the VLAN for it to operate on that VLAN.'
  },
  {
    no: 78,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the network below. PC1 needs to be able to communicate with PC2.<br>R1 and R3 already have the necessary configurations.' },
      { image: '../images/CCNA/Question_78.png' },
      { question: 'You configure the following static routes on R2:<br>R2(config)# ipv6 route 2001:db8:0:1::/64 2001:db8:0:12::1<br>R2(config)# ipv6 route 2001:db8:0:3::/64 2001:db8:0:23::2<br>R2(config)# interface g0/0<br>R2(config-if)# ipv6 address 2001:db8:0:12::2/64<br>R2(config-if)# no shutdown<br>R2(config-if)# interface g0/1<br>R2(config-if)# ipv6 address 2001:db8:0:23::1/64<br>R2(config-if)# no shutdown<br>However PC1 is unable to ping PC2. Which of the following is most likely to reason for this issue?' }
    ],
    choices: {
      a: "You need to enable IPv6 on R2's G0/0 and G0/1 interfaces.",
      b: 'You need to enable IPv6 routing on R2.',
      c: 'You need to specify the exit interface of the static routes.',
      d: 'The next hop IP addresses of the static routes are incorrect.'
    },
    answer: ['b'],
    explanation: 'IPv6 routing must be enabled globally with "ipv6 unicast-routing" for IPv6 to function.'
  },
  {
    no: 79,
    type: 'M',
    topic: '',
    question: 'Which of the following configuration management tools encourage a procedural approach? (select two)',
    choices: {
      a: 'Ansible',
      b: 'Terraform',
      c: 'Puppet',
      d: 'Chef'
    },
    answer: ['a', 'd'],
    explanation: 'Ansible and Chef encourage a procedural approach, while Puppet and Terraform are more declarative.'
  },
  {
    no: 80,
    type: 'M',
    topic: '',
    question: "A PC and an IP Phone are connected to the network via SW1's G0/1 interface. You issue the following configurations on SW1 G0/1:<br>SW1(config-if)# switchport mode access<br>SW1(config-if)# switchport access vlan 10<br>SW1(config-if)# switchport voice vlan 11<br>Which of the following statements are true? (select two)",
    choices: {
      a: 'Traffic sent to and from the PC is untagged.',
      b: 'Traffic sent to and from the PC is tagged.',
      c: 'Traffic sent to and from the IP Phone is untagged.',
      d: 'Traffic sent to and from the IP Phone is tagged.'
    },
    answer: ['a', 'd'],
    explanation: 'PC traffic is untagged (access VLAN), while IP Phone traffic is tagged (voice VLAN).'
  },
  {
    no: 81,
    type: 'M',
    topic: '',
    question: 'R1 is connected to R2. R1\'s interface is operating in full-duplex are R2\'s interface is operating in half-duplex <br><br> As R1 and R2 forward packets to each other, which counters do you expect to be increasing on R2? (select <b>two</b>)',
    choices: {
      a: 'CRC',
      b: 'Collisions',
      c: 'Late Collision',
      d: 'Giants'
    },
    answer: ['b', 'c'],
    explanation: 'Setting the reference bandwidth to 100000 makes a FastEthernet interface (100 Mbps) have a cost of 1000.'
  },
  {
    no: 82,
    type: 'M',
    topic: '',
    question: 'Which of these commands can be used to make a FastEthernet interface have an OSPF cost of 1000?',
    choices: {
      a: 'R1(config-router)# auto-cost reference-bandwidth 1000',
      b: 'R1(config-router)# auto-cost reference-bandwidth 10000',
      c: 'R1(config-router)# auto-cost reference-bandwidth 100000',
      d: 'R1(config-router)# auto-cost reference-bandwidth 1000000'
    },
    answer: ['c'],
    explanation: 'Setting the reference bandwidth to 100000 makes a FastEthernet interface (100 Mbps) have a cost of 1000.'
  },
  {
    no: 83,
    type: 'M',
    topic: '',
    question: 'Which of the following are valid VRRP router roles? (select two)',
    choices: {
      a: 'AVG',
      b: 'AVF',
      c: 'Active',
      d: 'Standby',
      e: 'Master',
      f: 'Backup'
    },
    answer: ['e', 'f'],
    explanation: 'VRRP routers can be Master or Backup.'
  },
  {
    no: 84,
    type: 'M',
    topic: '',
    question: 'Which of the following Syslog severity level and keyword pairs match? (select four)',
    choices: {
      a: '0 - Alert',
      b: '2 - Critical',
      c: '4 - Warning',
      d: '1 - Emergency',
      e: '7 - Notice',
      f: '3 - Error',
      g: '5 - Debugging',
      h: '6 - Informational'
    },
    answer: ['b', 'c', 'f', 'h'],
    explanation: '2=Critical, 3=Error, 4=Warning, 6=Informational are correct pairs.'
  },
  {
    no: 85,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the network below.' },
      { image: '../images/CCNA/Question_85.png' },
      { question: 'PC1 sends an ICMP echo request to PC2. When R2 forwards the message toward R3, which of the following statements about the source and destination L2 addresses is true?' }
    ],
    choices: {
      a: "Source: R2 G0/1's L2 address, Destination: R3 G0/0's L2 address",
      b: "Source: PC1 eth0's L2 address, Destination: PC2 eth0's L2 address",
      c: "Source: R2 G0/1's L2 address, Destination: PC2 eth0's L2 address",
      d: "Source: PC1 eth0's L2 address, Destination: R3 G0/0's L2 address"
    },
    answer: ['a'],
    explanation: 'When forwarding to R3, the source is R2 G0/1 and the destination is R3 G0/0 MAC address.'
  },
  {
    no: 86,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'LAB QUESTION<br><br>Download the attached .pka file and open it in Packet Tracer (version 8.2.0 or above required to open the file).' },
      { image: '../images/CCNA/Question_86.png' }
    ],
    choices: {
      a: 'Successfully completed the lab.',
      b: 'Did not successfully complete the lab.'
    },
    answer: ['a'],
    explanation: 'Successfully completing the lab is the desired outcome.'
  },
  {
    no: 87,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the network diagram below:' },
      { image: '../images/CCNA/Question_87.png' },
      { question: 'You have configured ACL 100 on R1:<br>R1(config)# ip access-list extended 100<br>R1(config-std-nacl)# deny tcp 10.0.0.0 0.0.0.255 eq 443 192.168.1.0 0.0.0.255<br>R1(config-std-nacl)# deny tcp 172.16.0.0 0.0.0.255 eq 443 192.168.1.0 0.0.0.255<br>R1(config-std-nacl)# permit ip any any<br>R1(config-std-nacl)# interface g0/0<br>R1(config-if)# ip access-class 100 in<br>However it is not having the intended effect. Which of the following changes should be made to prevent hosts in 10.0.0.0/24 and 172.16.0.0/24 from sending HTTPS traffic to 192.168.1.0/24, while allowing other traffic? (select three)' }
    ],
    choices: {
      a: 'Change permit ip any any to deny ip any any.',
      b: 'Filter based on destination port, not source port.',
      c: 'Move ACE 30 before ACE 10.',
      d: 'Apply the ACL outbound.',
      e: 'Apply the ACL with the ip access-group command, not the ip access-class command.',
      f: 'Configure port 80 instead of port 443.'
    },
    answer: ['b', 'd', 'e'],
    explanation: 'You must filter on destination port, apply the ACL outbound, and use ip access-group for interface ACLs.'
  },
  {
    no: 88,
    type: 'MWI',
    topic: '',
    question: [
      { question: "Examine the output of show cdp neighbors detail on R1:" },
      { image: '../images/CCNA/Question_88.png' },
      { question: "Which of the following statements are true? (select two)" }
    ],
    choices: {
      a: "R1's neighbors are both running Cisco IOSv software.",
      b: "R1 is connected to R2's G0/2 interface.",
      c: "R2 and R3 are sending CDPv2 messages.",
      d: "R1 should receive another CDP message from R2 in 27 seconds.",
      e: "R1 should receive another CDP message from R3 in 17 seconds."
    },
    answer: ['c', 'd'],
    explanation: 'CDPv2 is indicated, and the holdtime for R2 is 27 seconds.'
  },
  {
    no: 89,
    type: 'M',
    topic: '',
    question: 'You configure four static routes on R1. Which will it select to forward a packet destined for 2001:db8:0:1:34ef:1234:ab34:9872?',
    choices: {
      a: 'ipv6 route 2001:db8:0:1:34e8::/77 2001:db8:0:2::1',
      b: 'ipv6 route 2001:db8:0:1:34ec::/79 2001:db8:0:3::1',
      c: 'ipv6 route 2001:db8:0:1:34ec::/78 2001:db8:0:4::1',
      d: 'ipv6 route 2001:db8:0:1:34ef:2000::/83 2001:db8:0:5::1'
    },
    answer: ['c'],
    explanation: 'The most specific (longest prefix match) is /78, option C.'
  },
  {
    no: 90,
    type: 'M',
    topic: '',
    question: 'Examine the following JSON-formatted data:<br>{"device": {"name": "R1","vendor": "Cisco","model": "1101"},"interface_config": {"interface_name": "GigabitEthernet1/1","is_up": "true","ipaddress": "192.168.1.1","netmask": "255.255.255.0","speed": 1000}}<br>Which of the following statements are true? (select three)',
    choices: {
      a: 'The value of "is_up" is a boolean.',
      b: 'The value of "device" is an object.',
      c: 'The whitespace formatting is invalid.',
      d: 'There is one unneeded curly bracket.',
      e: 'The value of "model" is a string.',
      f: 'There are two nested objects.'
    },
    answer: ['b', 'e', 'f'],
    explanation: '"device" is an object, "model" is a string, and there are two nested objects in the JSON.'
  },
  {
    no: 90,
    type: 'M',
    topic: '',
    question: 'Which of the following SNMP messages are sent by managed devices to alert the NMS of a particular event? (select two)',
    choices: {
      a: 'Trap',
      b: 'Inform',
      c: 'Alert',
      d: 'Response',
      e: 'Set',
      f: 'GetNext'
    },
    answer: ['a', 'b'],
    explanation: 'Trap and Inform messages are sent by managed devices to notify the NMS of events.'
  },
  {
    no: 91,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about UDP is true?',
    choices: {
      a: 'UDP uses sequencing, but not acknowledgment.',
      b: 'UDP uses a checksum for error detection.',
      c: 'UDP adds a 16-byte header to the data.',
      d: 'UDP uses larger window sizes than TCP.'
    },
    answer: ['b'],
    explanation: 'UDP uses a checksum for error detection.'
  },
  {
    no: 92,
    type: 'M',
    topic: '',
    question: 'You issue the following commands on R1:<br><br>R1(config)#ip route 10.0.0.0 255.255.255.0 192.168.1.2<br>R1(config)#ip route 10.0.0.0 255.255.255.0 192.168.2.2<br>R1(config)#ip route 10.0.0.0 255.255.255.0 192.168.3.2<br>R1(config)#ip route 10.0.0.0 255.255.255.0 192.168.4.2 2<br>Which of the following statements is true?',
    choices: {
      a: 'R1 will load-balance packets destined for 10.0.0.0/24 over four next hops.',
      b: 'R1 will load-balance packets destined for 10.0.0.0/24 over three next hops.',
      c: 'R1 will forward all packets destined for 10.0.0.0/24 to 192.168.4.2.',
      d: 'R1 will forward all packets destined for 10.0.0.0/24 to 192.168.3.2.'
    },
    answer: ['b'],
    explanation: 'The route with AD 2 (192.168.4.2) is only used if the others are unavailable, so load balancing is over three next hops.'
  },
  {
    no: 93,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the network diagram below:' },
      { image: '../images/CCNA/Question_95.png' },
      { question: 'You configure the four ACLs below on R1:<br>R1(config)# ip access-list extended 101<br>R1(config-ext-nacl)# permit udp host 10.0.0.10 host 192.168.1.100 eq 514<br>R1(config-ext-nacl)# deny udp any host 192.168.1.100 eq 514<br>R1(config-ext-nacl)# permit ip any any<br><br>R1(config)# ip access-list extended 102<br>R1(config-ext-nacl)# permit udp host 10.0.0.10 eq 514 host 192.168.1.100<br>R1(config-ext-nacl)# deny udp any eq 514 host 192.168.1.100<br>R1(config-ext-nacl)# permit ip any any<br><br>R1(config)# ip access-list extended 103<br>R1(config-ext-nacl)# permit tcp host 10.0.0.10 host 192.168.1.100 eq 514<br>R1(config-ext-nacl)# deny tcp any host 192.168.1.100 eq 514<br>R1(config-ext-nacl)# permit ip any any<br><br>R1(config)# ip access-list extended 104<br>R1(config-ext-nacl)# permit tcp host 10.0.0.10 eq 514 host 192.168.1.100<br>R1(config-ext-nacl)# deny tcp any eq 514 host 192.168.1.100<br>R1(config-ext-nacl)# permit ip any any<br><br>Which ACL, when applied outbound on R1\'s G0/0 interface, permits only PC1 to access the Syslog server on SRV1? All other traffic should be unaffected.' }
    ],
    choices: {
      a: 'ACL 101',
      b: 'ACL 102',
      c: 'ACL 103',
      d: 'ACL 104'
    },
    answer: ['a'],
    explanation: 'ACL 101 permits only PC1 (10.0.0.10) to access the Syslog server (192.168.1.100) via UDP/514, and denies all others.'
  },
  {
    no: 94,
    type: 'M',
    topic: '',
    question: 'R1 is connected to a broadcast OSPF segment with four other routers. R1 is neither DR nor BDR for the segment. How many routers on the segment does R1 exchange LSAs with?',
    choices: {
      a: 'One',
      b: 'Two',
      c: 'Three',
      d: 'Four'
    },
    answer: ['b'],
    explanation: 'A non-DR/BDR router exchanges LSAs with the DR and BDR only.'
  },
  {
    no: 95,
    type: 'M',
    topic: '',
    question: 'You issue the following command on SW1:<br>SW1(config)# spanning-tree pathcost method long<br>Which of the following correctly represent the default Spanning Tree port costs after issuing this command? (select two)',
    choices: {
      a: 'Bandwidth: 10 Mbps, Cost: 2000000',
      b: 'Bandwidth: 10 Mbps, Cost: 100',
      c: 'Bandwidth: 10 Gbps, Cost: 2000',
      d: 'Bandwidth: 1 Gbps, Cost: 4',
      e: 'Bandwidth: 10 Gbps, Cost: 1',
      f: 'Bandwidth: 100 Mbps, Cost: 20000'
    },
    answer: ['a', 'c'],
    explanation: 'With long method, 10 Mbps = 2000000, 10 Gbps = 2000.'
  },
  {
    no: 96,
    type: 'M',
    topic: '',
    question: 'You issue the following command on R1:<br>R1(config-router)# default-information originate<br>What kind of router is R1 as a result of this command?',
    choices: {
      a: 'Interarea',
      b: 'Backbone',
      c: 'ABR',
      d: 'ASBR'
    },
    answer: ['d'],
    explanation: 'This command makes R1 an ASBR (Autonomous System Boundary Router).'
  },
  {
    no: 97,
    type: 'M',
    topic: '',
    question: 'You issue the following command on SW1:<br>SW1(config)# ip arp inspection vlan 1<br>Which of the following statements are true? (select two)',
    choices: {
      a: 'SW1 will consult the DAI table to decide whether to forward or drop ARP messages.',
      b: 'SW1 will consult ARP ACLs to decide whether to forward or drop ARP messages.',
      c: 'SW1 will consult the DHCP Snooping table to decide whether to forward or drop ARP messages.',
      d: 'SW1 will consult the Port Security table to decide whether to forward or drop ARP messages.'
    },
    answer: ['b', 'c'],
    explanation: 'DAI uses ARP ACLs and the DHCP Snooping table to validate ARP messages.'
  },
  {
    no: 98,
    type: 'M',
    topic: '',
    question: 'Which of the following are advantages of fiber optic cabling over copper UTP cabling? (select two)',
    choices: {
      a: 'Fiber optic cables cost less.',
      b: 'Fiber optic cables support longer maximum distances.',
      c: 'Fiber optic cables are less vulnerable to damage from bending.',
      d: 'Fiber optic cables are not vulnerable to EMI.'
    },
    answer: ['b', 'd'],
    explanation: 'Fiber supports longer distances and is immune to EMI.'
  },
  {
    no: 101,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about VTP are true? (select two)',
    choices: {
      a: 'A VTP server will not sync its VLAN database to another VTP server.',
      b: 'VTP is used to automatically configure interfaces in the proper VLAN.',
      c: 'A VTP transparent switch will forward VTP advertisements.',
      d: 'Only switches running VTPv3 support extended VLANs.'
    },
    answer: ['c', 'd'],
    explanation: 'A VTP transparent switch will forward VTP advertisements, and only VTPv3 supports extended VLANs.'
  },
  {
    no: 102,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about speed and duplex mismatches are true? (select two)',
    choices: {
      a: 'A speed mismatch will cause the interface to go down.',
      b: 'A duplex mismatch will cause the interface to go down.',
      c: 'A duplex mismatch will cause the collision counter to increment.',
      d: 'A speed mismatch will cause the collision counter to increment.'
    },
    answer: ['a', 'c'],
    explanation: 'A duplex mismatch will cause the collision counter to increment, and a speed mismatch will also cause the collision counter to increment.'
  },
  {
    no: 103,
    type: 'M',
    topic: '',
    question: 'A piece of software that can be used to crack a weak password is an example of what?',
    choices: {
      a: 'Threat',
      b: 'Vulnerability',
      c: 'Exploit',
      d: 'Attack'
    },
    answer: ['c'],
    explanation: 'An exploit is a piece of software that takes advantage of a vulnerability, such as a weak password.'
  },
  {
    no: 104,
    type: 'M',
    topic: '',
    question: 'You issue the following commands on R1 (192.168.12.1) and R2:<br><br><code>R1:<br>R1(config)# ntp master<br>R1(config)# ntp authentication-key 1 md5 ccna<br>R1(config)# ntp trusted-key 1<br>R2:<br>R2(config)# ntp authentication-key 2 md5 ccna<br>R2(config)# ntp trusted-key 2<br>R2(config)# ntp server 192.168.12.1 key 2</code><br><br>Which of the following statements are true? (select two)',
    choices: {
      a: 'R2 will sync its clock to R1.',
      b: 'R2 will not sync its clock to R1.',
      c: 'R2 is configured in static client mode.',
      d: 'R1 and R2 are NTP peers.'
    },
    answer: ['b', 'c'],
    explanation: 'R2 will not sync its clock to R1 because the key numbers do not match. R2 is configured in static client mode.'
  },
  {
    no: 105,
    type: 'M',
    topic: '',
    question: 'R1 learns the following routes:<br>• 10.0.0.0/8 via EIGRP, metric 2345<br>• 10.0.0.0/8 via OSPF, metric 10<br>• 10.0.0.0/16 via RIP, metric 3<br>• 10.0.0.0/17 via OSPF, metric 5<br>• 10.0.0.0/24 statically configured, AD 250<br><br>Which of the routes will R1 insert into its routing table? (select all correct answers)',
    choices: {
      a: '10.0.0.0/8 via EIGRP, metric 2345',
      b: '10.0.0.0/8 via OSPF, metric 10',
      c: '10.0.0.0/16 via RIP, metric 3',
      d: '10.0.0.0/17 via OSPF. metric 5',
      e: '10.0.0.0/24 statically configured, AD 250'
    },
    answer: ['a', 'c', 'd', 'e'],
    explanation: 'R1 will install the most specific routes for each prefix, and for equal-length prefixes, the route with the lowest AD is preferred.'
  },
  {
    no: 106,
    type: 'M',
    topic: '',
    question: 'You issue the following command on R1:<br><br><code>R1(config)# ip route 203.0.113.0 255.255.255.252 192.168.12.3</code><br><br>Which of the following statements are true? (select three)',
    choices: {
      a: 'The AD of the route is 1.',
      b: 'The AD of the route is 5.',
      c: 'It is a network route.',
      d: 'It is a host route.',
      e: 'It is a fully specified route.',
      f: 'It is a recursive route.'
    },
    answer: ['a', 'c', 'f'],
    explanation: 'The default AD for static routes is 1, the route is a network route, and it is recursive since the next hop is an IP address.'
  },
  {
    no: 107,
    type: 'M',
    topic: '',
    question: 'Which of the following features are provided by TCP, but not by UDP? (select three)',
    choices: {
      a: 'Session multiplexing',
      b: 'Data sequencing',
      c: 'Identifying the Application Layer protocol',
      d: 'Error recovery',
      e: 'Flow control',
      f: 'Error detection'
    },
    answer: ['b', 'd', 'e'],
    explanation: 'TCP provides data sequencing, error recovery, and flow control, which UDP does not.'
  },
  {
    no: 108,
    type: 'M',
    topic: '',
    question: 'How can network automation help to reduce OpEx?',
    choices: {
      a: 'Automation increases efficiency, requiring less network hardware.',
      b: 'Generating device configurations requires fewer man-hours.',
      c: 'Virtualized devices reduce hardware requirements.',
      d: 'Manual network design is not required.'
    },
    answer: ['b'],
    explanation: 'Automation reduces OpEx by reducing the man-hours required to generate device configurations.'
  },
  {
    no: 109,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the network below.<br><br>R1 is used to route traffic between VLANs via ROAS.<br>You want to limit broadcast domains as much as possible, but allow all VLANs to communicate with each other via R1.<br>Which of the following switch configurations are appropriate? (select three)' },
      { image: '../images/CCNA/Question_109.png' },
      { question: 'Which of the following switch configurations are appropriate? (select three)' }
    ],
    choices: {
      a: 'VLANs 10, 20, 30, and 40 should be created on SW2.',
      b: 'VLANs 10, 20, 30, and 40 should be created on SW1.',
      c: 'VLANs 10 and 20 should be created on SW2.',
      d: 'VLANs 10, 30, and 40 should be created on SW1.',
      e: 'VLANS 10, 20, 30, and 40 should be allowed on the SW1&lt;&gt;SW2 link.',
      f: 'VLANS 10, 30, and 40 should be allowed on the SW1&lt;&gt;SW2 link.'
    },
    answer: ['a', 'd', 'f'],
    explanation: 'To limit broadcast domains and allow all VLANs to communicate, create all VLANs on SW2, only the required VLANs on SW1, and allow only the necessary VLANs on the trunk link.'
  },
  {
    no: 110,
    type: 'M',
    topic: '',
    question: 'R1 and R2 are OSPF neighbors with a FULL adjacency on a broadcast network segment.<br>You issue the following commands on R2 to change its OSPF timers:<br><br><code>R2(config-if)# ip ospf hello-interval 5<br>R2(config-if)# ip ospf dead-interval 20</code><br><br>What will be the effect of these commands? (select two)',
    choices: {
      a: "R2's timers are returned to the default settings.",
      b: "R2's timers are half the default settings.",
      c: "R1 and R2 will remain OSPF neighbors.",
      d: "R1 and R2's adjacency will go down."
    },
    answer: ['b', 'd'],
    explanation: "R2's timers are half the default, but since R1 and R2's timers no longer match, their adjacency will go down."
  },
  {
    no: 111,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the diagram below:<br><br>You need to configure a new dynamic interface which will be used to map VLAN 20 to WLAN 20. Which tab should you use to do this configuration?' },
      { image: '../images/CCNA/Question_111.png' },
      { question: 'Which tab should you use to do this configuration?' }
    ],
    choices: {
      a: 'WLANs',
      b: 'Controller',
      c: 'Wireless',
      d: 'Management'
    },
    answer: ['b'],
    explanation: 'The Controller tab is used to configure dynamic interfaces on a WLC.'
  },
  {
    no: 112,
    type: 'M',
    topic: '',
    question: 'You are configuring a DHCP pool (192.168.1.0/24) on R1 to be used for client devices in the LAN. However, you want to reserve the first 10 usable IP addresses to be used for R1\'s own IP address as well as servers. Which command should you use on R1 to reserve those IP addresses?',
    choices: {
      a: '<code>R1(config)# ip dhcp excluded-address 192.168.1.1 192.168.1.10</code>',
      b: '<code>R1(dhcp-config)# ip dhcp excluded-address 192.168.1.1 192.168.1.10</code>',
      c: '<code>R1(dhcp-config)# network 192.168.1.0 255.255.255.0 reserve 192.168.1.1 192.168.1.10</code>',
      d: '<code>R1(config)# ip dhcp reserve 192.168.1.1 192.168.1.10</code>'
    },
    answer: ['a'],
    explanation: 'The correct command to reserve a range of addresses is <code>ip dhcp excluded-address</code> in global config mode.'
  },
  {
    no: 113,
    type: 'M',
    topic: '',
    question: 'Two servers, SRV1 and SRV2, are both configured with the IP address 2001:db8:0:1::1/64. Which of the following terms best describes this type of address?',
    choices: {
      a: 'Unicast',
      b: 'Anycast',
      c: 'Multicast',
      d: 'Modified EUI-64'
    },
    answer: ['b'],
    explanation: 'An anycast address is assigned to multiple devices, and packets are delivered to the nearest device.'
  },
  {
    no: 114,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the output below:<br><br>Which of the following statements are true? (select two)' },
      { image: '../images/CCNA/Question_114.png' },
      { question: 'Which of the following statements are true? (select two)' }
    ],
    choices: {
      a: "R1's GigabitEthernet0/3 interface is connected to R2's GigabitEthernet0/4 interface.",
      b: "R1's GigabitEthernet0/4 interface is connected to R2's GigabitEthernet0/3 interface.",
      c: "R2's IP address is 192.168.12.2.",
      d: "R1's IP address is 192.168.12.2."
    },
    answer: ['a', 'c'],
    explanation: "R1's G0/3 is connected to R2's G0/4, and R2's IP address is 192.168.12.2."
  },
  {
    no: 115,
    type: 'M',
    topic: '',
    question: 'Which of the following configuration management tools is written in Go?',
    choices: {
      a: 'Chef',
      b: 'Puppet',
      c: 'Ansible',
      d: 'Terraform'
    },
    answer: ['d'],
    explanation: 'Terraform is written in Go.'
  },
  {
    no: 116,
    type: 'M',
    topic: '',
    question: 'An enterprise installs keypads that require staff to enter a code to gain access to secure rooms. What is this an example of?',
    choices: {
      a: 'User awareness',
      b: 'User training',
      c: 'Physical access control',
      d: 'Multifactor authentication'
    },
    answer: ['c'],
    explanation: 'Keypads are a form of physical access control.'
  },
  {
    no: 117,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about Cat 5e cables are true? (select two)',
    choices: {
      a: 'They support speeds of up to 10 Gbps.',
      b: 'They support speeds of up to 1 Gbps.',
      c: 'They should be a maximum of 400 meters in length.',
      d: 'They should be a maximum of 100 meters in length.'
    },
    answer: ['b', 'd'],
    explanation: 'Cat 5e supports up to 1 Gbps and a maximum length of 100 meters.'
  },
  {
    no: 118,
    type: 'M',
    topic: '',
    question: 'Which of the following AP modes offers one or more BSS\'s for clients? (select two)',
    choices: {
      a: 'FlexConnect',
      b: 'Monitor',
      c: 'SE-Connect',
      d: 'Local'
    },
    answer: ['a', 'd'],
    explanation: 'FlexConnect and Local modes offer BSSs for clients.'
  },
  {
    no: 119,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Download the attached .pka file and open it in Packet Tracer (version 8.2.0 or above required to open the file).' },
      { image: '../images/CCNA/Question_119.png' },
      { question: 'The lab is evaluated by looking for the following lines in the startup-config of the routers (so you must save the config with write, write memory, or copy running-config startup-config):<br><br>R1:<br>On G0/0:<br><code>ip ospf 1 area 0</code><br>On G0/1:<br><code>ip ospf 1 area 0</code><br><code>ip ospf network point-to-point</code><br>---<br><code>router ospf 1</code><br><code>router-id 1.1.1.1</code><br>R2:<br>On G0/0:<br><code>ip ospf 1 area 0</code><br><code>ip ospf priority 100</code><br>On G0/1:<br><code>ip ospf 1 area 0</code><br>---<br><code>ip route 0.0.0.0 0.0.0.0 203.0.113.1</code><br><code>router ospf 1</code><br><code>router-id 2.2.2.2</code><br><code>passive-interface gigabitethernet0/1</code><br><code>default-information originate</code><br>R3:<br>On G0/0:<br><code>ip ospf 1 area 0</code><br><code>ip ospf priority 0</code><br>---<br><code>router ospf 1</code><br><code>router-id 3.3.3.3</code><br>R4:<br>On G0/0:<br><code>ip ospf network point-to-point</code><br>---<br><code>router ospf 1</code><br><code>router-id 4.4.4.4</code><br><code>network 192.168.14.4 0.0.0.0 area</code>' }
    ],
    choices: {
      a: 'Successfully completed the lab.',
      b: 'Did not successfully complete the lab.'
    },
    answer: ['a'],
    explanation: 'The lab is evaluated by checking for the required configuration lines in the startup-configs.'
  },
  {
    no: 120,
    type: 'M',
    topic: '',
    question: 'Which of the following statements about FTP are true? (select three)',
    choices: {
      a: 'FTP control connections use TCP port 20.',
      b: 'FTP control connections use TCP port 21.',
      c: 'FTP data connections use TCP port 20.',
      d: 'FTP data connections use TCP port 21.',
      e: 'FTP requires user authentication.',
      f: 'FTP only works on IOS images that support cryptographic features.'
    },
    answer: ['b', 'c', 'e'],
    explanation: 'FTP control connections use TCP port 21, data connections use TCP port 20, and FTP requires user authentication.'
  },
  {
    no: 121,
    type: 'M',
    topic: '',
    question: 'A router, a WLC, and several LWAPs are connected to SW1. FlexConnect is enabled for some WLANs. Which of the following ports on SW1 should be Trunk ports?',
    choices: {
      a: 'The ports connected to the router, WLC, and APs.',
      b: 'The ports connected to the WLC and APs.',
      c: 'The ports connected to the router and WLC.',
      d: 'The ports connected to the router.'
    },
    answer: ['a'],
    explanation: 'All ports connected to the router, WLC, and APs should be trunk ports.'
  },
  {
    no: 122,
    type: 'M',
    topic: '',
    question: 'Which of the following is used to restrict which IP addresses can manage the WLC?',
    choices: {
      a: 'FlexConnect ACL',
      b: 'Layer 2 ACL',
      c: 'CPU ACL',
      d: 'TACACS+'
    },
    answer: ['c'],
    explanation: 'CPU ACLs are used to restrict management access to the WLC.'
  },
  {
    no: 123,
    type: 'M',
    topic: '',
    question: 'In which of the following situations is UDP preferred over TCP?',
    choices: {
      a: 'When port numbers must be used.',
      b: 'When it is acceptable for some packets to be lost.',
      c: 'When lost packets must be retransmitted.',
      d: 'When Layer 4 must provide error recovery.'
    },
    answer: ['b'],
    explanation: 'UDP is preferred when it is acceptable for some packets to be lost.'
  },
  {
    no: 124,
    type: 'M',
    topic: '',
    question: 'Which of the following are valid HSRP virtual MAC addresses? (select two)',
    choices: {
      a: '0000.5e07.ac01',
      b: '0007.0c9f.f001',
      c: '0007.b400.0101',
      d: '0000.5e00.0108',
      e: '0000.0c9f.f00a',
      f: '0000.0c07.ac0a'
    },
    answer: ['e', 'f'],
    explanation: 'The valid HSRP virtual MAC addresses are 0000.0c9f.f00a and 0000.0c07.ac0a.'
  },
  {
    no: 125,
    type: 'M',
    topic: '',
    question: 'R1\'s G0/2 interface is connected to the Internet. It has several internal LANs connected to its other interfaces. You issue the following commands on R1:<br><br><code>R1(config)#ip access-list extended 110</code><br><code>R1(config-ext-nacl)#permit tcp host 10.2.3.1 host 8.8.8.8 eq domain</code><br><code>R1(config-ext-nacl)#permit udp host 10.2.3.1 host 8.8.8.8 eq domain</code><br><code>R1(config-ext-nacl)#deny tcp 10.2.3.0 0.0.0.255 host 8.8.8.8 eq domain</code><br><code>R1(config-ext-nacl)#deny udp 10.2.3.0 0.0.0.255 host 8.8.8.8 eq domain</code><br><code>R1(config-ext-nacl)#interface g0/2</code><br><code>R1(config-if)#ip access-group 110 out</code><br><br>Which of the following statements are true? (select two)',
    choices: {
      a: '10.2.3.1 is able to access the DNS server at 8.8.8.8.',
      b: 'Other hosts in the 10.2.3.0/24 subnet would be able to access the DNS server at 8.8.8.8.',
      c: 'A host in the 10.3.4.0/24 subnet would not be able to access the DNS server at 8.8.8.8.',
      d: 'The ACL filters traffic received on G0/2.'
    },
    answer: ['a', 'c'],
    explanation: '10.2.3.1 is permitted, and a host in 10.3.4.0/24 is not matched by the ACL and is denied by the implicit deny.'
  },
  {
    no: 126,
    type: 'M',
    topic: '',
    question: 'You issue the following command on R1\'s G0/0 interface:<br><br><code>R1(config-if)# ipv6 address 2001:db8:0:1::/64 eui-64</code><br><br>The MAC address of G0/0 is 962f.6d8a.8e27. What will be the IPv6 address of R1\'s G0/0 interface?',
    choices: {
      a: '2001:db8:0:1:902f:6dff:fe8a:8e27',
      b: '2001:db8:0:1:942f:6dff:fe8a:8e27',
      c: '2001:db8:0:1:960f:6dff:fe8a:8e27',
      d: '2001:db8:0:1:942f:6eff:fe8a:8e27'
    },
    answer: ['b'],
    explanation: 'The correct EUI-64 address is 2001:db8:0:1:942f:6dff:fe8a:8e27.'
  },
  {
    no: 127,
    type: 'M',
    topic: '',
    question: 'Which of the following are constraints of REST APIs? (select three)',
    choices: {
      a: 'Client-Server',
      b: 'Stateless',
      c: 'Flat system',
      d: 'Stateful',
      e: 'Peer-to-Peer',
      f: 'Layered system'
    },
    answer: ['a', 'b', 'f'],
    explanation: 'REST APIs are client-server, stateless, and layered.'
  },
  {
    no: 128,
    type: 'M',
    topic: '',
    question: 'R1 and R2 are OSPF neighbors, but they remain in the 2WAY state without proceeding to FULL. Which of the following could be the reason for this?',
    choices: {
      a: "R1 and R2's IP addresses are in different subnets.",
      b: "R1 and R2 are DROTHERS.",
      c: "R1 is a DROTHER.",
      d: "R1 and R2's Hello/Dead timers do not match."
    },
    answer: ['b'],
    explanation: 'On broadcast networks, DROTHER routers only form FULL adjacencies with the DR and BDR, not with each other.'
  },
  {
    no: 129,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the network diagram below. All switches are running Rapid PVST+.<br><br>Which of the following statements are true? (select three)' },
      { image: '../images/CCNA/Question_129.png' },
      { question: 'Which of the following statements are true? (select three)' }
    ],
    choices: {
      a: 'SW1 F0/2 is a Root port.',
      b: 'SW2 G1/0 is a Root port.',
      c: 'SW4 F0/1 is an Alternate port.',
      d: 'SW1 G1/0 is a Root port.',
      e: 'SW3 G1/2 is an Alternate port.',
      f: 'SW3 G1/2 is a Backup port.'
    },
    answer: ['c', 'd', 'f'],
    explanation: 'SW4 F0/1 is an Alternate port, SW1 G1/0 is a Root port, and SW3 G1/2 is a Backup port.'
  },
  {
    no: 130,
    type: 'M',
    topic: '',
    question: 'Which of the following IP addresses are contained in the stated subnet? (select three)',
    choices: {
      a: 'IP address: 203.0.128.1, Subnet: 203.0.0.0/17',
      b: 'IP address: 7.23.65.20, Subnet: 7.23.56.0/21',
      c: 'IP address: 192.168.253.24, Subnet: 192.168.253.16/29',
      d: 'IP address: 172.19.255.255, Subnet: 172.16.0.0/14',
      e: 'IP address: 45.209.101.101, Subnet: 45.209.100.0/23',
      f: 'IP address: 143.222.176.62, Subnet: 143.222.176.32/27'
    },
    answer: ['d', 'e', 'f'],
    explanation: 'The correct IP addresses are contained in the stated subnets.'
  },
  {
    no: 131,
    type: 'M',
    topic: '',
    question: 'Which of the following statements are true? (select two)',
    choices: {
      a: 'DHCP Snooping must be enabled globally and per-VLAN.',
      b: 'DAI must be enabled globally and per-VLAN.',
      c: 'DHCP Snooping must be enabled globally only.',
      d: 'DAI must be enabled globally only.',
      e: 'DHCP Snooping must be enabled per-VLAN only.',
      f: 'DAI must be enabled per-VLAN only.'
    },
    answer: ['a', 'f'],
    explanation: 'DHCP Snooping must be enabled globally and per-VLAN. DAI must be enabled per-VLAN only.'
  },
  {
    no: 132,
    type: 'MWI',
    topic: '',
    question: [
      { question: "R1 uses NAT to translate the IP addresses of hosts in its internal LAN. R1 translates a packet from PC1 in the internal LAN. Examine the output of <code>show ip nat translations</code> below.<br><br>Which of the following statements are true? (select two)" },
      { image: '../images/CCNA/Question_132.png' },
      { question: 'Which of the following statements are true? (select two)' }
    ],
    choices: {
      a: '192.168.2.167 is the IP address configured on PC1.',
      b: '192.168.1.167 is the IP address configured on PC1.',
      c: '192.168.0.167 is the IP address configured on PC1.',
      d: 'R1 is performing static NAT.',
      e: 'R1 is performing dynamic NAT.'
    },
    answer: ['b', 'e'],
    explanation: '192.168.1.167 is the inside local address, and the translation is dynamic.'
  },
  {
    no: 133,
    type: 'M',
    topic: '',
    question: "You want to activate OSPF on R1's G0/1 and G0/2 interfaces with a single command.<br>G0/1 IP: 172.21.31.28/25<br>G0/2 IP: 172.21.34.29/30<br>Which of the following commands should you use on R1?",
    choices: {
      a: '<code>network 0.0.0.0 127.255.255.255 area 0</code>',
      b: '<code>network 172.16.0.0 0.15.255.255 area 0</code>',
      c: '<code>network 172.21.0.0 0.0.31.255 area 0</code>',
      d: '<code>network 172.0.0.0 0.7.255.255 area 0</code>'
    },
    answer: ['b'],
    explanation: 'The wildcard mask 0.15.255.255 covers both interfaces.'
  },
  {
    no: 134,
    type: 'M',
    topic: '',
    question: 'Which IPv6 address type is automatically configured on an interface when the <code>ipv6 enable</code> command is used?',
    choices: {
      a: 'EUI-64',
      b: 'Global Unicast',
      c: 'Unique Local',
      d: 'Link Local'
    },
    answer: ['d'],
    explanation: 'The Link Local address is automatically configured when <code>ipv6 enable</code> is used.'
  },
  {
    no: 135,
    type: 'M',
    topic: '',
    question: "VLAN 10 does not yet exist on SW1. You issue the <code>switchport access vlan 10</code> command on its G0/1 interface. What is the result of this command?",
    choices: {
      a: 'The interface is disabled until VLAN 10 is created.',
      b: 'The command is rejected.',
      c: 'VLAN 10 is automatically created.',
      d: 'The interface remains in the default VLAN until VLAN 10 is created.'
    },
    answer: ['c'],
    explanation: 'The switch will automatically create VLAN 10 when the command is issued.'
  },
  {
    no: 136,
    type: 'M',
    topic: '',
    question: 'Which layer of the SDN Architecture contains the fabric?',
    choices: {
      a: 'Application',
      b: 'Control',
      c: 'Infrastructure',
      d: 'Access'
    },
    answer: ['c'],
    explanation: 'The Infrastructure layer contains the fabric in SDN architecture.'
  },
  {
    no: 137,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the network below:<br><br>You have been given the following requirements:<br>• PC1 can use HTTPS to communicate with SRV1, but other devices in 10.0.0.0/24 can\'t.<br>• PC2 can\'t use TFTP to communicate with SRV1, but other devices in 172.16.0.0/24 can.<br>• All other traffic should be allowed.<br>Which of the following ACLs, when applied outbound on R1 G0/0, fulfills the above requirements?' },
      { image: '../images/CCNA/Question_137.png' },
      { question: 'Which of the following ACLs, when applied outbound on R1 G0/0, fulfills the above requirements?' }
    ],
    choices: {
      a: '<code>Extended IP access list 101<br>10 permit tcp host 10.0.0.10 host 192.168.1.100 eq 443<br>20 deny tcp 10.0.0.0 0.0.0.255 host 192.168.1.100 eq 443<br>30 deny udp host 172.16.0.10 host 192.168.1.100 eq 69<br>40 permit ip any any</code>',
      b: '<code>Extended IP access list 102<br>10 permit tcp host 10.0.0.10 host 192.168.1.100 eq 443<br>20 deny tcp 10.0.0.0 0.0.0.255 host 192.168.1.100 eq 443<br>30 deny tcp host 172.16.0.10 host 192.168.1.100 eq 69<br>40 permit tcp 172.16.0.0 0.0.0.255 host 192.168.1.100 eq 69<br>50 permit ip any any</code>',
      c: '<code>Extended IP access list 103<br>10 permit tcp host 10.0.0.10 eq 443 host 192.168.1.100<br>20 deny tcp 10.0.0.0 0.0.0.255 eq 443 host 192.168.1.100<br>30 deny udp host 172.16.0.10 eq 69 host 192.168.1.100<br>40 permit udp 172.16.0.0 0.0.0.255 eq 69 host 192.168.1.100<br>50 permit ip any any</code>',
      d: '<code>Extended IP access list 104<br>10 permit tcp host 10.0.0.10 host 192.168.1.100 eq 443<br>20 deny tcp 10.0.0.0 0.0.0.255 host 192.168.1.100 eq 443<br>30 deny tcp host 172.16.0.10 host 192.168.1.100 eq 69<br>40 permit ip any any</code>'
    },
    answer: ['a'],
    explanation: 'ACL 101 matches the requirements for HTTPS and TFTP restrictions.'
  },
  {
    no: 138,
    type: 'M',
    topic: '',
    question: 'Which of the following IP addresses are in a range specified by RFC 1918? (select two)',
    choices: {
      a: '172.15.0.1',
      b: '192.168.254.254',
      c: '172.33.0.1',
      d: '172.29.247.255',
      e: '192.0.0.1',
      f: '11.0.0.1'
    },
    answer: ['d', 'b'],
    explanation: '172.29.247.255 and 192.168.254.254 are within RFC 1918 private address ranges.'
  },
  {
    no: 139,
    type: 'M',
    topic: '',
    question: 'You issue the following command on R1:<br><br><code>R1(config)# ipv6 route 2001:db8::/64 fe80::68a7:93ff:fe07:db9a</code><br><br>Which of the following statements are true? (select two)',
    choices: {
      a: 'The command will be rejected.',
      b: 'It is a host route.',
      c: 'It is a network route.',
      d: 'It is a directly-connected route.',
      e: 'It is a fully-specified route.',
      f: 'It is a route to a link-local network.'
    },
    answer: ['c', 'a'],
    explanation: 'It is a network route, but the command will be rejected because the next hop is a link-local address and the outgoing interface is not specified.'
  },
  {
    no: 140,
    type: 'M',
    topic: '',
    question: 'Which of the following are necessary to generate an RSA key pair? (select two)',
    choices: {
      a: 'An IP address',
      b: 'A domain name',
      c: 'A non-default host name',
      d: 'A username and password'
    },
    answer: ['b', 'c'],
    explanation: 'A domain name and a non-default host name are required to generate an RSA key pair.'
  },
  {
    no: 141,
    type: 'M',
    topic: '',
    question: 'In a three-tier architecture, which of the following features would you not expect to find at the Core layer? (select two)',
    choices: {
      a: 'STP',
      b: 'OSPF',
      c: 'Layer 3 connections',
      d: 'QoS marking'
    },
    answer: ['a', 'd'],
    explanation: 'STP and QoS marking are not typically found at the Core layer.'
  },
  {
    no: 142,
    type: 'M',
    topic: '',
    question: 'Which of the following commands can be used to configure a pre-hashed MD5 enable password?',
    choices: {
      a: '<code>enable secret &lt;password&gt;</code>',
      b: '<code>enable secret 5 &lt;hash&gt;</code>',
      c: '<code>enable password 7 &lt;hash&gt;</code>',
      d: '<code>enable secret 5 &lt;password&gt;</code>'
    },
    answer: ['b'],
    explanation: 'The correct syntax is <code>enable secret 5 &lt;hash&gt;</code>.'
  },
  {
    no: 143,
    type: 'M',
    topic: '',
    question: 'R1 learns the following routes:<br>• 10.0.0.0/8 via EIGRP, metric 1234<br>• 10.0.0.0/16 via via OSPF, metric 10<br>• 10.0.0.0/24 via via RIP, metric 5<br>• 10.0.0.0/30 via static configuration<br>Which route(s) will it add to its routing table? (select all correct answers)',
    choices: {
      a: '10.0.0.0/8',
      b: '10.0.0.0/16',
      c: '10.0.0.0/24',
      d: '10.0.0.0/30'
    },
    answer: ['a', 'b', 'c', 'd'],
    explanation: 'All listed routes will be added to the routing table as they are the most specific or valid for their respective prefixes.'
  },
  {
    no: 144,
    type: 'MWI',
    topic: '',
    question: [
      { question: 'Examine the diagram below.<br><br>Which configuration on SW1 G0/0 allows PC1 (VLAN 10) and PH1 (VLAN 20) to be in separate VLANs without configuring G0/0 in trunk mode?' },
      { image: '../images/CCNA/Question_144.png' },
      { question: 'Which configuration on SW1 G0/0 allows PC1 (VLAN 10) and PH1 (VLAN 20) to be in separate VLANs without configuring G0/0 in trunk mode?' }
    ],
    choices: {
      a: '<code>switchport trunk native vlan 10<br>switchport voice vlan 20</code>',
      b: '<code>switchport access vlan 10<br>switchport trunk native vlan 20</code>',
      c: '<code>switchport access vlan 10<br>switchport voice vlan 20</code>',
      d: '<code>switch access vlan 10,20</code>'
    },
    answer: ['c'],
    explanation: 'The correct configuration is <code>switchport access vlan 10</code> and <code>switchport voice vlan 20</code>.'
  },
  {
    no: 145,
    type: 'M',
    topic: '',
    question: 'Which Catalyst Center feature uses AI to automate network troubleshooting, including root cause analysis and corrective actions?',
    choices: {
      a: 'AI endpoint analytics',
      b: 'AI enhanced RRM',
      c: 'MR engine',
      d: 'ML Tshoot engine'
    },
    answer: ['c'],
    explanation: 'The MR engine uses AI for troubleshooting and root cause analysis.'
  },
  {
    no: 146,
    type: 'M',
    topic: '',
    question: 'Which 2.4 GHz channels should be used to avoid interference?',
    choices: {
      a: '2,6,10',
      b: '1,2,3',
      c: '1,5,10',
      d: '1,6,11'
    },
    answer: ['d'],
    explanation: 'Channels 1, 6, and 11 are non-overlapping in the 2.4 GHz band.'
  },
  {
    no: 147,
    type: 'M',
    topic: '',
    question: 'The DR of an OSPF broadcast network segment of four routers goes down due to a hardware failure. Which of the following statements is true?',
    choices: {
      a: 'An election will be held to decide the new DR.',
      b: 'Elections will be held to decide the new DR and BDR.',
      c: 'The BDR will become the DR, and an election will be held to decide the new BDR.',
      d: 'The BDR will remain the same, and an election will be held to decide the new DR.'
    },
    answer: ['c'],
    explanation: 'The BDR becomes the DR, and a new BDR is elected.'
  },
  {
    no: 148,
    type: 'M',
    topic: '',
    question: 'Which version(s) of WPA support(s) Enterprise mode?',
    choices: {
      a: 'WPA3',
      b: 'WPA2',
      c: 'WPA2 and WPA3',
      d: 'WPA, WPA2, and WPA3'
    },
    answer: ['d'],
    explanation: 'All versions of WPA support Enterprise mode.'
  },
  {
    no: 149,
    type: 'M',
    topic: '',
    question: "Let's walk through the lab. First, use the web browser on PC1 to access https://172.16.1.10 and login with admin/Cisco123<br>1) Configure a dynamic interface for the Internal WLAN.<br>From the Controller tab, go to Interfaces on the left column, click on New..., and configure the following:<br>• Interface Name: Internal<br>• VLAN Id: 100<br>• Click on Apply<br>• Port Number: 1<br>• IP Address: 10.0.0.10<br>• Netmask: 255.255.255.0<br>• Gateway: 10.0.0.1<br>• Primary DHCP Server: 10.0.0.1<br>• Click on Apply<br>2) Configure a dynamic interface for the Guest WLAN.<br>Return to Interfaces on the left column, click on New..., and configure the following:<br>• Interface Name: Guest<br>• VLAN Id: 200<br>• Click on Apply<br>• Port Number: 1<br>• IP Address: 10.1.0.10<br>• Netmask: 255.255.255.0<br>• Gateway: 10.1.0.1<br>• Primary DHCP Server: 10.1.0.1<br>• Click on Apply<br>3) Configure and enable the Internal WLAN.<br>From the WLANs tab, click on Go and configure the following:<br>• Profile Name: Internal<br>• SSID: Internal<br>• ID: 1<br>• Click on Apply<br>• Status: Enabled (check)<br>• Interface/Interface Group(G): Internal<br>• Click on Security<br>• Layer 2 Security: WPA+WPA2<br>• WPA2 Policy: (check)<br>• WPA2 Encryption: AES (check)<br>• PSK: Enable (check)<br>• PSK Format: ASCII, PSK = cisco123<br>• Click on Apply<br>4) Configure and enable the Guest WLAN.<br>Return to the WLANs tab, click on Go and configure the following:<br>• Profile Name: Guest<br>• SSID: Guest<br>• ID: 2<br>• Click on Apply<br>• Status: Enabled (check)<br>• Interface/Interface Group(G): Guest<br>• Click on Security<br>• Layer 2 Security: WPA+WPA2<br>• WPA2 Policy: (check)<br>• WPA2 Encryption: AES (check)<br>• PSK: Enable (check)<br>• PSK Format: ASCII, PSK = cisco456<br>• Click on Apply<br><br>Optionally, you can save the WLC's configuration after completing the steps, but it doesn't affect the evaluation of the lab.",
    choices: {
      a: 'Done it!',
      b: 'Don\'t',
    },
    answer: ['a'],
    explanation: 'Follow the step-by-step instructions to complete the lab.'
  },
  {
    no: 150,
    type: 'M',
    topic: '',
    question: 'Which of the following SNMP messages are sent to UDP port 162? (Select all that apply)',
    choices: {
      a: 'Get',
      b: 'Trap',
      c: 'Inform',
      d: 'Set'
    },
    answer: ['b', 'c'],
    explanation: 'Trap and Inform messages are sent to UDP port 162.'
  }
];

const fileName = window.location.pathname.split("/").pop();
  const topicName = 'Cisco Certified Network Associate (CCNA) 200 - 301';

if (fileName === 'quiz.html') {

  const script = document.createElement('script');
  script.src = '../asset/js/newPracticeQuiz.js';
  document.head.appendChild(script);
} else if (fileName == 'practiceExam.html') {
  const script = document.createElement('script');
  script.src = '../asset/js/quiz.js';
  document.head.appendChild(script);
} else {
  
  const script = document.createElement('script');
  script.src = '../asset/js/quizAdmin.js';
  document.head.appendChild(script);
  
}
