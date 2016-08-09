
contract split {
	address public owner;
	address public accountA = 0x4d4d5660e9fa9606d4eb2b436c759e45ee17806d;
	address public accountB = 0x2768c285ba729060992da50b3567c9175712f1b9;
	//accountA = 0x4d4d5660e9fa9606d4eb2b436c759e45ee17806d;
	//accountB = 0x2768c285ba729060992da50b3567c9175712f1b9;

	function split() {
		owner = msg.sender;
	}

	function returnowner() returns (address) {
		return (owner);
	}

	function sendEther(uint etherValue) returns (bool) {
//Account A
		accountA.send(etherValue / 2);
//Account B
		accountB.send(etherValue / 2);
		return true;
	}
}
