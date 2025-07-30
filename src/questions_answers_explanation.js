const questions = {
    trueFalse: [
        { question: "Encryption ensures both confidentiality and integrity of data.", answer: false, explanation: "Encryption ensures confidentiality, but not integrity. Data integrity requires additional tools like cryptographic hash functions or digital signatures." },
        { question: "A firewall can completely prevent insider threats.", answer: false, explanation: "A firewall cannot fully protect against insider threats, as those originate from within the trusted perimeter." },
        { question: "Antivirus software can detect all forms of malware.", answer: false, explanation: "Antivirus software cannot detect all forms of malicious software (malware), especially sophisticated, zero-day, or fileless variants." },
        { question: "Defense in Depth relies on multiple layers of security.", answer: true, explanation: "Defense in Depth is a strategy that uses multiple layers of security controls to protect systems." },
        { question: "Security through obscurity is a best practice in modern security.", answer: false, explanation: "Security through obscurity (relying on secrecy rather than robust design) is not a best practice in modern security." },
        { question: "Access control lists (ACLs) are used to filter network traffic.", answer: true, explanation: "Access Control Lists (ACLs) are used to filter network traffic based on rules set by administrators." },
        { question: "Two-factor authentication is weaker than using a long password alone.", answer: false, explanation: "Two-Factor Authentication (2FA) is stronger than a long password alone because it combines two independent factors (like a password and a mobile device)." },
        { question: "Updating systems regularly helps prevent zero-day attacks.", answer: false, explanation: "Regular updates help fix known vulnerabilities, but cannot prevent zero-day attacks, which exploit unknown flaws." },
        { question: "A hashed password can be reversed back to the original password.", answer: false, explanation: "A hashed password (especially when salted and hashed with a secure algorithm) cannot be reversed to its original form." },
        { question: "The CIA Triad stands for Confidentiality, Integrity, and Availability.", answer: true, explanation: "The CIA Triad stands for Confidentiality, Integrity, and Availability, the three foundational principles of cybersecurity." },
        { question: "Perfect forward secrecy ensures that the compromise of a long-term key does not compromise past session keys.", answer: true, explanation: "Perfect Forward Secrecy (PFS) ensures that compromise of long-term cryptographic keys does not compromise past session keys." },
        { question: "MAC (Mandatory Access Control) provides more flexibility than DAC (Discretionary Access Control) in dynamic enterprise environments.", answer: false, explanation: "Mandatory Access Control (MAC) is generally less flexible than Discretionary Access Control (DAC) in dynamic environments like enterprises." },
        { question: "Implementing security controls always improves system usability.", answer: false, explanation: "Implementing security controls often introduces complexity and may reduce system usability, especially if poorly designed." },
        { question: "Network segmentation can help contain lateral movement during a cyberattack.", answer: true, explanation: "Network segmentation helps isolate parts of a network to contain lateral movement during cyberattacks." },
        { question: "A single-point-of-failure in authentication infrastructure makes the entire network vulnerable even if MFA is used.", answer: true, explanation: "A single point of failure in an authentication infrastructure can compromise an entire system, even if Multi-Factor Authentication (MFA) is in use." },
        { question: "In hospital IT environments, availability is often prioritized over confidentiality.", answer: true, explanation: "In hospital Information Technology (IT) environments, availability (e.g., system uptime) is often prioritized over confidentiality due to patient safety concerns." },
        { question: "A delay of 2 seconds in medical device telemetry can violate real-time safety requirements.", answer: true, explanation: "A delay of just 2 seconds in medical device telemetry can violate real-time safety requirements and put patients at risk." },
        { question: "Air-gapping hospital systems guarantees protection against ransomware.", answer: false, explanation: "Air-gapping (isolating systems from networks) reduces risk but does not guarantee protection, especially from physical or insider threats." },
        { question: "Endpoint detection systems are more difficult to deploy in legacy medical equipment due to certification constraints.", answer: true, explanation: "Endpoint Detection and Response (EDR) systems are difficult to deploy in legacy medical equipment due to regulatory and certification constraints." },
        { question: "Phishing awareness training is 100% effective in preventing attacks.", answer: false, explanation: "Phishing awareness training helps, but it is not 100% effective. Humans still make mistakes." },
        { question: "Humans are often the weakest link in cybersecurity because they fail to follow technical protocols, not because of flawed design.", answer: false, explanation: "People are often considered the weakest link because of poor design and usability of systems, not just a failure to follow rules." },
        { question: "Deep-fake technology poses a growing threat to biometric authentication systems.", answer: true, explanation: "Deepfake technology poses a growing threat to biometric authentication systems, such as facial recognition or voice authentication." },
        { question: "Insider threats are more likely to be detected through behavior analytics than perimeter defenses.", answer: true, explanation: "Insider threats are more likely to be detected by behavior analytics than by traditional perimeter-based security." },
        { question: "Advanced Persistent Threats (APTs) often avoid using malware to reduce detection risk.", answer: true, explanation: "Advanced Persistent Threats (APTs) often avoid using malware to reduce the risk of being detected by antivirus software." },
        { question: "Living-off-the-land (LOTL) attacks use built-in tools to evade antivirus detection.", answer: true, explanation: "Living-Off-the-Land (LOTL) attacks use legitimate system tools (e.g., PowerShell) to avoid triggering antivirus alerts." },
        { question: "Honeypots are offensive tools used to take down attacker infrastructure.", answer: false, explanation: "Honeypots are defensive tools used to detect and study attackers, not offensive tools for taking down attacker infrastructure." },
        { question: "C2 channels often use encrypted DNS tunneling to avoid detection.", answer: true, explanation: "Command and Control (C2) channels in modern attacks often use encrypted Domain Name System (DNS) tunneling to evade detection." },
        { question: "Most consumer IoT devices support secure boot and firmware validation by default.", answer: false, explanation: "Most consumer Internet of Things (IoT) devices do not come with secure boot and firmware validation enabled by default." },
        { question: "SCADA systems were not originally designed with security in mind.", answer: true, explanation: "Supervisory Control and Data Acquisition (SCADA) systems were originally designed without security in mind and often use unauthenticated, proprietary protocols." },
        { question: "IIoT environments commonly suffer from shadow IT due to decentralized procurement.", answer: true, explanation: "Industrial Internet of Things (IIoT) environments often suffer from shadow IT — devices or systems acquired without central IT's knowledge — due to decentralized procurement." },
        { question: "Physical access to ICS equipment is irrelevant if remote access is secured.", answer: false, explanation: "Physical access to Industrial Control Systems (ICS) can still result in serious compromise, even if remote access is secured." },
        { question: "Firmware updates in IIoT must be scheduled carefully due to uptime and safety.", answer: true, explanation: "Firmware updates in Industrial Internet of Things (IIoT) systems must be carefully scheduled due to high availability and safety requirements." }
    ],
    multipleChoice: [
        {
            question: "What does a firewall primarily do?",
            options: ["Encrypts data", "Scans for viruses", "Blocks unauthorized network traffic", "Stores security logs"],
            answer: ["Blocks unauthorized network traffic"],
            explanation: "A firewall's main purpose is to act as a barrier, controlling incoming and outgoing network traffic based on a set of security rules."
        },
        {
            question: "Which of the following is a form of social engineering?",
            options: ["SQL injection", "Brute-force attack", "Phishing email", "Port scanning"],
            answer: ["Phishing email"],
            explanation: "Phishing is a classic social engineering technique that manipulates people into divulging sensitive information."
        },
        {
            question: "Which element is not part of the CIA triad?",
            options: ["Confidentiality", "Integrity", "Availability", "Accessibility"],
            answer: ["Accessibility"],
            explanation: "The CIA triad is a foundational cybersecurity model consisting of Confidentiality, Integrity, and Availability. Accessibility is not one of its core components."
        },
        {
            question: "Which protocols are commonly used to secure web communication?",
            options: ["FTP", "HTTPS", "TLS", "HTTP"],
            answer: ["HTTPS", "TLS"],
            explanation: "TLS is the cryptographic protocol that provides security for HTTPS. FTP and HTTP are insecure protocols."
        },
        {
            question: "A denial-of-service (DoS) attack can affect which of the following?",
            options: ["Network Performance", "Availability", "Authentication", "Integrity"],
            answer: ["Network Performance", "Availability"],
            explanation: "A DoS attack aims to make a machine or network resource unavailable to its intended users by overwhelming it with traffic, thus impacting performance and availability."
        },
        {
            question: "What are common security issues in IoT (Internet of Things) devices?",
            options: ["Default Passwords", "Lack of regular updates", "Too much memory", "Weak Encryption"],
            answer: ["Default Passwords", "Lack of regular updates", "Weak Encryption"],
            explanation: "IoT devices are notorious for having insecure default passwords, infrequent or non-existent updates, and weak encryption protocols, making them easy targets."
        },
        {
            question: "Which types of malware can involve financial demands or extortion?",
            options: ["Worm", "Ransomware", "Some Trojans", "Spyware"],
            answer: ["Ransomware", "Some Trojans"],
            explanation: "Ransomware explicitly encrypts files and demands a ransom. Some types of Trojans may also be used to extort money from victims."
        },
        {
            question: "What are typical components of two-factor authentication (2FA)?",
            options: ["Two Passwords", "Something you know (e.g., password)", "Something you have (e.g., phone)", "Two usernames"],
            answer: ["Something you know (e.g., password)", "Something you have (e.g., phone)"],
            explanation: "2FA combines two different factors: something the user knows (like a password) and something the user has (like a smartphone)."
        },
        {
            question: "Which of the following use biometric authentication?",
            options: ["Fingerprint", "Face Recognition", "Password", "Security Questions"],
            answer: ["Fingerprint", "Face Recognition"],
            explanation: "Biometric authentication uses unique physiological characteristics like fingerprints or facial features to verify identity."
        },
        {
            question: "Which OSI layers can be involved in encryption?",
            options: ["Application", "Transport", "Presentation", "Physical"],
            answer: ["Application", "Transport", "Presentation"],
            explanation: "Encryption can be applied at multiple OSI layers, including Presentation (e.g., SSL/TLS), Application, and Transport, but not the Physical layer."
        },
        {
            question: "Which of the following are input manipulation attacks?",
            options: ["SQL Injection", "Command injection", "ARP Spoofing", "Brute Force Attack"],
            answer: ["SQL Injection", "Command injection"],
            explanation: "SQL and command injection attacks work by manipulating the input to a program or query to execute unintended commands."
        },
        {
            question: "What helps reduce session hijacking in web or mobile apps?",
            options: ["Using Plain HTTP", "Hardcoded Login Data", "Session Timeout", "Secure Token Renewal"],
            answer: ["Session Timeout", "Secure Token Renewal"],
            explanation: "Implementing session timeouts and renewing security tokens regularly are effective measures against session hijacking. Using plain HTTP and hardcoded data are insecure practices."
        },
        {
            question: "Which systems are commonly used in industrial automation?",
            options: ["VPN", "ICS (Industrial Control Systems)", "SCADA", "DNS"],
            answer: ["ICS (Industrial Control Systems)", "SCADA"],
            explanation: "ICS and SCADA are specialized systems designed for monitoring and controlling industrial processes."
        },
        {
            question: "What do phishing attacks mainly exploit?",
            options: ["User Trust", "Physical Security", "Human behavior", "Firewalls"],
            answer: ["User Trust", "Human behavior"],
            explanation: "Phishing attacks are fundamentally based on exploiting human psychology—specifically, trust and behavior—to trick individuals."
        },
        {
            question: "A healthcare data breach can impact:",
            options: ["Patient Privacy", "Patient Safety", "Hospital facilities access", "Printer ink supply"],
            answer: ["Patient Privacy", "Patient Safety"],
            explanation: "A breach in healthcare can lead to the violation of patient privacy and can also impact patient safety if critical information or systems are compromised."
        },
        {
            question: "Which of the following are common attack methods on social media?",
            options: ["Phishing Links", "XSS (Cross-Site Scripting)", "BIOS corruption", "SYN flood"],
            answer: ["Phishing Links", "XSS (Cross-Site Scripting)"],
            explanation: "Spreading phishing links and exploiting XSS vulnerabilities are common ways attackers compromise users and platforms on social media."
        },
        {
            question: "What can help prevent brute-force login attacks?",
            options: ["CAPTCHA", "Account Lockout Policy", "Plain HTTP", "Public Wi-Fi Access"],
            answer: ["CAPTCHA", "Account Lockout Policy"],
            explanation: "CAPTCHA and account lockout policies are two effective controls to thwart automated brute-force login attempts."
        },
        {
            question: "What describes a zero-day vulnerability?",
            options: ["An already patched bug", "A flaw unknown to the vendor", "A flaw exploited before a fix is available", "An issue in air-gapped systems only"],
            answer: ["A flaw unknown to the vendor", "A flaw exploited before a fix is available"],
            explanation: "A zero-day vulnerability is a security flaw that is known to and exploited by attackers before the vendor is aware of it or has been able to release a patch."
        },
        {
            question: "Why are ICS environments hard to secure?",
            options: ["They can't tolerate frequent updates", "Downtime is not acceptable", "Many use outdated software", "They're protected by default"],
            answer: ["They can't tolerate frequent updates", "Downtime is not acceptable", "Many use outdated software"],
            explanation: "Industrial Control Systems prioritize availability and stability, making frequent updates and downtime unacceptable. Many also run on legacy software, which complicates security."
        },
        {
            question: "Which scenarios reflect a misconfiguration vulnerability?",
            options: ["Using factory default password", "Publicly accessible admin panels", "Well-Configured VPN", "Phishing Email"],
            answer: ["Using factory default password", "Publicly accessible admin panels"],
            explanation: "Using default passwords and leaving administrative panels open to the public are common and critical security misconfigurations."
        }
    ],
    fillInTheBlanks: [
        { question: "The three pillars of cybersecurity are ___, integrity, and availability.", answer: "Confidentiality", options: ["Confidentiality", "Authentication", "Authorization", "Non-repudiation"] },
        { question: "A ___ is a program or code that spreads itself by replicating across systems without user intervention.", answer: "Worm", options: ["Worm", "Virus", "Trojan", "Spyware"] },
        { question: "In access control models, DAC stands for ___ Access Control.", answer: "Discretionary", options: ["Discretionary", "Dynamic", "Delegated", "Distributed"] },
        { question: "The process of converting readable data into an unreadable format to protect it is called ___.", answer: "Encryption", options: ["Encryption", "Hashing", "Obfuscation", "Steganography"] },
        { question: "___ is a method to verify the identity of a user or system before granting access.", answer: "Authentication", options: ["Authentication", "Authorization", "Auditing", "Accounting"] },
        { question: "A ___ attack attempts to overwhelm a service to make it unavailable to users.", answer: "DDoS (Distributed Denial of Service)", options: ["DDoS (Distributed Denial of Service)", "SQL Injection", "Phishing", "Man-in-the-middle"] },
        { question: "In a ___ attack, an attacker manipulates input fields to execute arbitrary SQL code.", answer: "SQL Injection", options: ["SQL Injection", "Cross-Site Scripting", "Buffer Overflow", "Command Injection"] },
        { question: "___ engineering exploits human behavior rather than system vulnerabilities.", answer: "Social", options: ["Social", "Software", "System", "Security"] },
        { question: "A ___ is a type of malware that encrypts a user's files and demands payment.", answer: "Ransomware", options: ["Ransomware", "Spyware", "Adware", "Keylogger"] },
        { question: "An attack that uses legitimate tools like PowerShell to avoid detection is known as a ___ attack.", answer: "Living-off-the-land", options: ["Living-off-the-land", "Zero-Day", "Brute-Force", "Side-channel"] },
        { question: "In networking, a ___ isolates traffic between different segments for security.", answer: "VLAN (Virtual Local Area Network)", options: ["VLAN (Virtual Local Area Network)", "VPN (Virtual Private Network)", "Firewall", "Router"] },
        { question: "A ___ point of failure is a component that can bring down an entire system if compromised.", answer: "Single", options: ["Single", "Critical", "Weak", "Central"] },
        { question: "The term ___ refers to vulnerabilities that are exploited before a vendor releases a patch.", answer: "Zero-Day", options: ["Zero-Day", "Legacy", "Common", "Known"] },
        { question: "The protocol ___ is commonly used to secure web traffic using encryption.", answer: "HTTPS (HyperText Transfer Protocol Secure)", options: ["HTTPS (HyperText Transfer Protocol Secure)", "HTTP", "FTP", "SMTP"] },
        { question: "In cryptography, ___ ensures that a message cannot be changed without detection.", answer: "Integrity", options: ["Integrity", "Confidentiality", "Availability", "Authenticity"] },
        { question: "SCADA systems are commonly used in managing and monitoring ___ infrastructure such as power or water.", answer: "Critical", options: ["Critical", "Corporate", "Cloud", "Consumer"] },
        { question: "In healthcare, security incidents can affect not only data but also ___ safety.", answer: "Patient", options: ["Patient", "Doctor", "System", "Network"] },
        { question: "One reason ICS systems are hard to secure is their limited ability to tolerate ___.", answer: "Downtime", options: ["Downtime", "Updates", "Latency", "High traffic"] },
        { question: "Biometric authentication systems use ___ traits like fingerprints or facial patterns.", answer: "Physiological", options: ["Physiological", "Psychological", "Behavioral", "Positional"] }
    ],
    matching: [
        {
            scenario: "An employee receives a realistic-looking email appearing to be from the IT department, asking for password verification. After clicking the link and entering their credentials, their account is compromised.",
            question: "Which solution would most effectively reduce this risk in the future?",
            options: ["Network segmentation", "User awareness training", "Web application firewall", "Data encryption"],
            answer: "User awareness training"
        },
        {
            scenario: "A set of smart cameras in a hospital are accessed remotely by attackers who use factory-set login credentials.",
            question: "Which of the following is the most suitable countermeasure?",
            options: ["Implementing two-factor authentication", "Changing default passwords and enforcing strong password policies", "Installing antivirus software", "Disabling USB ports"],
            answer: "Changing default passwords and enforcing strong password policies"
        },
        {
            scenario: "Attackers exploit an input field on a banking website to execute unauthorized database queries and extract customer data.",
            question: "What security solution best prevents this type of attack?",
            options: ["Input validation and parameterized queries", "Multi-factor authentication", "Network intrusion detection", "VPN tunnels"],
            answer: "Input validation and parameterized queries"
        },
        {
            scenario: "A hospital’s scheduling system is encrypted by ransomware. All appointments and records are locked, and a ransom demand appears.",
            question: "Which would be the most effective preemptive measure?",
            options: ["Encrypting stored data", "Backing up systems regularly and storing backups offline", "Using password managers", "Performing regular penetration tests"],
            answer: "Backing up systems regularly and storing backups offline"
        },
        {
            scenario: "A patient connects to the hospital's public Wi-Fi and logs into the patient portal. An attacker intercepts the communication and captures login data.",
            question: "What security mechanism best protects against this?",
            options: ["Enabling SSL/TLS for all web traffic", "Installing antivirus software", "Updating operating systems", "Creating a DMZ"],
            answer: "Enabling SSL/TLS for all web traffic"
        },
        {
            scenario: "An ICS network at a power plant is accessed through a connected office workstation without strong network segregation.",
            question: "Which solution would most effectively mitigate this risk?",
            options: ["Endpoint antivirus", "Network segmentation and air-gapping", "Email filtering", "Public key encryption"],
            answer: "Network segmentation and air-gapping"
        },
        {
            scenario: "An attacker attempts to access a bank's user accounts by rapidly guessing username/password combinations.",
            question: "What control would best prevent this attack?",
            options: ["Strong encryption for stored files", "Two-factor authentication", "CAPTCHA and rate-limiting login attempts", "Network firewall"],
            answer: "CAPTCHA and rate-limiting login attempts"
        },
        {
            scenario: "Attackers compromise unpatched IIoT sensors on a factory floor, which haven’t been updated since installation.",
            question: "What’s the best security practice to address this issue?",
            options: ["Encrypt sensor data", "Apply regular firmware and software updates", "Use strong Wi-Fi passwords", "Disable Bluetooth"],
            answer: "Apply regular firmware and software updates"
        },
        {
            scenario: "An employee loses a USB stick that contains unencrypted patient data.",
            question: "Which security measure would best prevent data exposure in this case?",
            options: ["Endpoint detection and response", "Full disk encryption", "Disabling USB ports", "Firewall policy updates"],
            answer: "Full disk encryption"
        },
        {
            scenario: "An attacker phones the IT helpdesk, impersonating an executive and convincing the technician to reset their account password.",
            question: "What would most effectively help prevent this type of attack?",
            options: ["Role-based access control", "Helpdesk staff training in security awareness", "Encrypting all data in transit", "Antivirus scanning of email"],
            answer: "Helpdesk staff training in security awareness"
        }
    ],
    shortAnswer: [
        {
            question: "Hospitals and Ransomware: Explain how a ransomware attack on a hospital’s electronic medical record (EMR) system could affect patient care and operational continuity.",
            answer: "A ransomware attack on a hospital’s Electronic Medical Record (EMR) system can encrypt patient data, making it inaccessible. This disrupts diagnosis, treatment, and medication schedules, delaying care and potentially endangering lives. Operational continuity suffers as staff revert to manual processes, causing scheduling issues, communication breakdowns, and potential legal liabilities."
        },
        {
            question: "IoT Devices in Smart Homes: Describe one common vulnerability in consumer IoT devices and how attackers can exploit it. What might be the impact on users?",
            answer: "A common vulnerability is the use of default or weak passwords. Attackers can exploit this to gain remote access, enabling them to control devices like cameras or thermostats. Impacts include privacy invasion, energy theft, or using the device in botnets for larger cyberattacks."
        },
        {
            question: "Social Media and Phishing Campaigns: How can attackers use fake social media accounts to launch phishing or misinformation campaigns? Explain how this affects both individuals and platform reputation.",
            answer: "Attackers create fake social media accounts that impersonate individuals or companies to send malicious links or spread misinformation. This deceives users into sharing credentials or clicking malware links. It damages individual trust and erodes the credibility of the platform."
        },
        {
            question: "Banking and Credential Stuffing Attacks: What is a credential stuffing attack, and why are banking systems particularly vulnerable to it? Include a brief note on mitigation strategies.",
            answer: "Credential stuffing involves using stolen username/password combinations from data breaches to log into accounts. Banks are vulnerable due to users reusing passwords. Mitigations include rate-limiting login attempts, enforcing MFA (multi-factor authentication), and monitoring for abnormal login patterns."
        },
        {
            question: "ICS/SCADA and Remote Access Trojans: Explain how a Remote Access Trojan (RAT) could be used to compromise a SCADA system controlling a water treatment plant. What safety or national security risks might this pose?",
            answer: "A Remote Access Trojan (RAT) in a SCADA system allows attackers to manipulate controls remotely. In a water treatment plant, this could alter chemical dosages or disable pumps, risking public health or environmental damage. It poses national security risks by disrupting critical infrastructure."
        },
        {
            question: "Medical Devices and Wireless Attacks: Discuss how an attacker might exploit the wireless communication protocols of medical devices (e.g., pacemakers or insulin pumps). What are the ethical concerns involved?",
            answer: "Attackers may exploit unencrypted or insecure wireless protocols (e.g., Bluetooth) to send unauthorized commands to medical devices like pacemakers or insulin pumps. Ethical concerns include patient harm, violation of privacy, and the challenge of balancing security with medical usability."
        },
        {
            question: "Web Applications and SQL Injection: Explain how a SQL Injection attack works on a vulnerable online banking portal. What type of data or functionality could the attacker gain access to?",
            answer: "In SQL Injection, attackers insert malicious SQL code into input fields (e.g., login forms) of a vulnerable banking site. This can expose sensitive data (like account balances) or allow unauthorized fund transfers. Poor input validation and error handling contribute to this flaw."
        },
        {
            question: "IIoT in Manufacturing: Describe a potential cyberattack on an IIoT-connected robotic arm in a factory. How could this affect production quality or worker safety?",
            answer: "An attacker compromising a robotic arm via the IIoT network could alter its code to cause misalignment, resulting in defective products or even harming workers. This disrupts production, increases costs, and poses legal liabilities for safety violations."
        },
        {
            question: "Mobile Banking and Fake Apps: How do attackers use fake mobile apps to steal credentials or funds from users? What signs might help a user detect a fake app?",
            answer: "Fake apps mimic real banking apps to trick users into entering credentials or approving fake transactions. Signs include poor reviews, unusual permissions, or being listed under suspicious publishers. Users should verify app legitimacy through official app stores or websites."
        },
        {
            question: "Social Engineering in Corporate Environments: Provide an example of how an attacker could use a social engineering attack (like pretexting or baiting) to gain access to an internal IT system in a bank or company.",
            answer: "An attacker could pose as an IT technician (pretexting) and call an employee, requesting login credentials to “fix a system error.” Alternatively, they might leave a USB labeled \"Executive Salaries\" (baiting) in the office, hoping someone plugs it into the network, installing malware."
        }
    ],
    scenarioAnalysis: [
        {
            scenario: "A hospital’s main EMR (Electronic Medical Record) system is encrypted overnight due to a ransomware attack. Critical systems like patient history, medication schedules, and diagnostic tools are inaccessible.",
            question: "What were likely security oversights that led to this attack? How would you structure an immediate response plan and a longer-term prevention strategy?",
            answer: "Likely security oversights:\n\n*   Lack of timely and tested backups.\n*   Insufficient network segmentation allowing ransomware to spread.\n*   Outdated or unpatched software vulnerabilities.\n*   Lack of endpoint detection and response tools.\n*   Poor user awareness or phishing susceptibility leading to initial infection.\n\nImmediate response plan:\n\n*   Isolate infected systems immediately to prevent further spread.\n*   Notify incident response and cybersecurity teams.\n*   Activate backup restoration processes, ensuring backups are clean.\n*   Inform hospital administration and coordinate with patient care teams for manual operations.\n*   Report to relevant authorities if required.\n\nLonger-term prevention strategy:\n\n*   Implement robust backup policies with offline and offsite backups.\n*   Apply network segmentation between critical systems.\n*   Regularly patch and update all software.\n*   Deploy advanced endpoint detection and prevention solutions.\n*   Conduct regular staff phishing and cybersecurity awareness training.\n*   Implement least privilege access and multi-factor authentication."
        },
        {
            scenario: "A junior finance employee at a bank receives an email that appears to be from their IT department requesting urgent login verification. They click a link, enter credentials, and unknowingly compromise access to the internal system.",
            question: "Identify the security failure. What training and technical controls could have prevented this? What are the implications of compromised employee credentials in banking?",
            answer: "Security failure:\n\n*   Lack of employee awareness or training on phishing.\n*   Insufficient email filtering or anti-phishing controls.\n*   Possibly weak authentication methods without multi-factor authentication.\n\nPreventive training and technical controls:\n\n*   Regular, mandatory phishing awareness training and simulated phishing exercises.\n*   Implement email filtering solutions with phishing detection.\n*   Enforce multi-factor authentication for all internal systems.\n*   Use strict access controls and anomaly detection to flag unusual logins.\n\nImplications:\n\n*   Compromised credentials can allow attackers lateral movement within systems.\n*   Potential financial theft, data breaches, and regulatory penalties.\n*   Damage to customer trust and company reputation."
        },
        {
            scenario: "A smart home user finds their smart door lock is remotely unlocked, lights are flickering, and thermostat settings are changing without their input. Investigation reveals the default admin password was never changed.",
            question: "What vulnerabilities were exploited? How could better IoT device policies or configurations prevent this scenario?",
            answer: "Exploited vulnerabilities:\n\n*   Use of default, weak, or unchanged administrative passwords.\n*   Lack of device firmware updates and security configurations.\n*   No network segmentation for IoT devices.\n\nPrevention through policies/configurations:\n\n*   Enforce changing default passwords during setup.\n*   Require regular automatic firmware updates.\n*   Use strong, unique passwords and multi-factor authentication where possible.\n*   Segment IoT devices onto separate networks or VLANs.\n*   Educate users on securing home networks and IoT devices."
        },
        {
            scenario: "A power company notices erratic behavior in their ICS monitoring system. Further investigation shows malware has modified PLC (programmable logic controller) commands. The system was connected to a corporate network for convenience.",
            question: "What are the risks of connecting ICS systems to enterprise networks? What isolation and monitoring methods should be in place to defend ICS environments?",
            answer: "Risks of connecting ICS to enterprise networks:\n\n*   Increases attack surface for critical infrastructure.\n*   Malware can spread from corporate systems to ICS.\n*   Enterprise networks often have weaker security controls than ICS environments.\n\nRecommended isolation and monitoring:\n\n*   Use network segmentation and firewalls to separate ICS from corporate networks.\n*   Implement data diodes or unidirectional gateways where possible.\n*   Employ specialized ICS monitoring and anomaly detection systems.\n*   Maintain strict access controls with role-based permissions.\n*   Limit remote access with multi-factor authentication and VPNs."
        },
        {
            scenario: "A public figure’s social media account is taken over by an attacker who posts harmful and offensive content, damaging their public image. MFA (multi-factor authentication) was disabled at the time.",
            question: "How might the attacker have gained access? What role does MFA play in defending social media accounts, and how could platform-level security features have helped?",
            answer: "Possible attacker access methods:\n\n*   Password compromise due to weak or reused passwords.\n*   Social engineering or phishing attacks.\n*   Exploiting lack of multi-factor authentication.\n\nRole of multi-factor authentication (MFA):\n\n*   Adds an extra layer beyond just password, making unauthorized access harder.\n*   Can prevent account takeover even if passwords are compromised.\n\nPlatform-level security features that help:\n\n*   Account activity alerts.\n*   Login verification notifications.\n*   Device recognition and session management.\n*   Mandatory MFA for high-profile accounts."
        },
        {
            scenario: "A zero-day vulnerability in a bank's web application allows attackers to bypass login authentication without triggering alerts. Several accounts are drained of funds before the breach is discovered.",
            question: "What should be the incident response priorities in this case? What long-term security strategies could reduce exposure to zero-day attacks?",
            answer: "Incident response priorities:\n\n*   Immediately contain the breach: block affected services or isolate the application.\n*   Identify scope of compromise and affected accounts.\n*   Reset passwords and notify impacted customers.\n*   Conduct forensic analysis to understand the exploit.\n*   Apply emergency patches or workarounds.\n\nLong-term strategies:\n\n*   Implement regular security code reviews and penetration testing.\n*   Employ web application firewalls (WAF) to block suspicious requests.\n*   Use intrusion detection systems (IDS) with anomaly detection.\n*   Adopt threat intelligence to identify emerging zero-days.\n*   Establish a rapid patch management process."
        },
        {
            scenario: "A malicious actor sets up a fake Wi-Fi hotspot near a university hospital. Several medical interns accidentally connect and transmit login credentials, allowing attackers to access internal lab systems.",
            question: "What mistakes did users make? How can network and endpoint controls protect against rogue access points and credential theft?",
            answer: "User mistakes:\n\n*   Connecting to an untrusted, unsecured Wi-Fi hotspot.\n*   Transmitting credentials without secure channels (e.g., no VPN).\n\nNetwork and endpoint controls:\n\n*   Use WPA3 and enterprise Wi-Fi with authentication.\n*   Enforce VPN use for all remote or wireless connections.\n*   Deploy network access control (NAC) to verify devices before allowing network access.\n*   Use endpoint protection with credential theft detection.\n*   Educate users on verifying Wi-Fi legitimacy and using secure connections."
        }
    ],
    problemSolving: [
        {
            problem: "A hospital’s network monitoring system detects unusually high outbound traffic from a device in the radiology department during off-hours.",
            question: "As the security analyst, how would you investigate this incident? What steps would you take to contain it and prevent future occurrences?",
            solution: "Investigation:\n\n*   Identify the device generating the traffic and check device logs.\n*   Analyze traffic patterns (destination IPs, protocols, data volumes).\n*   Look for signs of malware, data exfiltration, or unauthorized remote access.\n*   Correlate with user activity logs and scheduled tasks.\n\nContainment:\n\n*   Isolate the device from the network to stop traffic flow.\n*   Quarantine the device for forensic analysis.\n*   Block suspicious IP addresses or domains at the firewall."
        },
        {
            problem: "Several employees in a bank report their accounts being locked out due to multiple failed login attempts within a short time.",
            question: "What might be causing these account lockouts? What tools and logs would you examine, and what preventive controls could be introduced?",
            solution: "Cause: This is likely a credential stuffing or brute-force attack.\n\nInvestigation:\n\n*   Examine authentication logs to identify source IP addresses and targeted accounts.\n*   Use a SIEM to correlate login failures across multiple systems.\n\nPreventive Controls:\n\n*   Implement rate-limiting and CAPTCHA.\n*   Enforce multi-factor authentication (MFA).\n*   Use a web application firewall (WAF) to block malicious IPs."
        },
        {
            problem: "An internet-connected infusion pump in a hospital frequently crashes after connecting to the network. Other devices in the same network are unaffected.",
            question: "How would you approach diagnosing whether this is a software fault or a security-related issue (e.g., DoS attack)? What mitigation steps would you recommend?",
            solution: "Diagnosis:\n\n*   Isolate the device on a separate test network to see if crashing persists.\n*   Analyze network traffic to the device for unusual patterns (e.g., malformed packets, high traffic volume).\n*   Review device logs for error messages.\n\nMitigation:\n\n*   If it's a security issue, segment the device behind a firewall and restrict access.\n*   If it's a software fault, contact the vendor for a patch or update.\n*   Implement network access control (NAC) to prevent unauthorized connections."
        },
        {
            problem: "Anomaly detection flags large uploads to a third-party cloud service from a developer’s workstation in a software firm.",
            question: "How do you determine whether this is a legitimate business need or a data exfiltration attempt? What containment and policy actions should follow?",
            solution: "Determination:\n\n*   Cross-reference the activity with approved business processes and developer tasks.\n*   Interview the developer to understand the context.\n*   Use Data Loss Prevention (DLP) tools to inspect the content of the uploaded data.\n\nContainment & Policy:\n\n*   If unauthorized, block the cloud service at the firewall and isolate the workstation.\n*   Review and enforce data handling policies.\n*   Implement stricter access controls on sensitive data."
        },
        {
            problem: "Sensor readings from an ICS system controlling water pressure in a plant show inconsistent values, with operators unable to validate the data's accuracy.",
            question: "What kinds of attacks could cause this? How would you verify whether the data is being tampered with, and how do you restore trust in system readings?",
            solution: "Potential Attacks: Man-in-the-middle attack, sensor spoofing, or malware modifying PLC logic.\n\nVerification:\n\n*   Physically inspect the sensor and its connections.\n*   Use an independent, trusted device to take parallel readings.\n*   Analyze network traffic for unauthorized commands or data manipulation.\n\nRestoration:\n\n*   Isolate the affected segment of the network.\n*   Restore PLC logic from a known-good backup.\n*   Implement network monitoring and integrity checks for sensor data."
        },
        {
            problem: "A file uploaded via a public-facing web application begins making outbound connections and spawning processes on the server.",
            question: "What immediate steps should you take to isolate and investigate the incident? What security measures should have been in place to prevent this?",
            solution: "Immediate Steps:\n\n*   Isolate the server from the network.\n*   Terminate the malicious processes.\n*   Take a snapshot of the system for forensic analysis.\n\nPreventive Measures:\n\n*   Implement file type validation and sandboxing for all uploads.\n*   Use a web application firewall (WAF).\n*   Run antivirus and endpoint detection on the server."
        },
        {
            problem: "After running a phishing simulation, 40% of employees clicked the malicious link, and 10% entered credentials.",
            question: "How should you address this result internally? What multi-layered strategy would you implement to reduce human risk in the future?",
            solution: "Internal Address:\n\n*   Provide immediate, targeted training to those who failed.\n*   Communicate the overall results to management without shaming individuals.\n\nMulti-layered Strategy:\n\n*   Regular, mandatory security awareness training and simulations.\n*   Implement technical controls like email filtering and anti-phishing banners.\n*   Enforce multi-factor authentication (MFA) to mitigate credential compromise."
        },
        {
            problem: "You discover that a known vulnerability still exists in several IIoT devices due to missed firmware updates.",
            question: "How do you approach securing these systems without disrupting operations? What policies and tools help manage patch compliance in IIoT environments?",
            solution: "Approach:\n\n*   Prioritize patching based on criticality and risk.\n*   Schedule updates during planned maintenance windows.\n*   Use virtual patching or network segmentation as temporary compensating controls.\n\nPolicies & Tools:\n\n*   Implement a formal patch management policy for IIoT.\n*   Use automated asset management and vulnerability scanning tools.\n*   Maintain an accurate inventory of all IIoT devices and their firmware versions."
        },
        {
            problem: "A junior staff member's account suddenly gains administrator-level access and performs sensitive file modifications on a corporate server.",
            question: "How would you investigate whether this is a misconfiguration, insider threat, or credential compromise? What access control models could prevent such cases?",
            solution: "Investigation:\n\n*   Disable the account immediately.\n*   Review access control logs to see how privileges were escalated.\n*   Interview the staff member to determine if their actions were intentional.\n*   Analyze login patterns for signs of credential theft.\n\nPrevention:\n\n*   Implement the Principle of Least Privilege.\n*   Use Role-Based Access Control (RBAC).\n*   Regularly audit user permissions and access rights."
        },
        {
            problem: "A new, unidentified device appears on the ICS network and begins attempting Modbus communications with PLCs.",
            question: "What steps would you take to identify and remove the rogue device? What network defenses and monitoring techniques can prevent such incidents?",
            solution: "Identification & Removal:\n\n*   Use network access control (NAC) to immediately quarantine the device.\n*   Identify its physical location through switch port mapping.\n*   Physically disconnect the device from the network.\n\nPrevention:\n\n*   Implement a strict NAC policy to block all unauthorized devices.\n*   Use network monitoring tools to detect new or unusual Modbus communications.\n*   Maintain an up-to-date asset inventory of all authorized ICS devices."
        }
    ]
};

export default questions;