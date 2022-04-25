pragma solidity ^0.5.0;
// pragma experimental ABIEncoderV2;
// Gas limit 改成 30000000 才可以 Deploy

library SafeMath {  
    /**
    * @dev Multiplies two numbers, reverts on overflow.
    */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    /**
    * @dev Integer division of two numbers truncating the quotient, reverts on division by zero.
    */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
    * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    /**
    * @dev Adds two numbers, reverts on overflow.
    */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }

    /**
    * @dev Divides two numbers and returns the remainder (unsigned integer modulo),
    * reverts when dividing by zero.
    */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}
library DateTime {
        /*
         *  Date and Time utilities for ethereum contracts
         *
         */
        struct _DateTime {
                uint16 year;
                uint8 month;
                uint8 day;
                uint8 hour;
                uint8 minute;
                uint8 second;
                uint8 weekday;
        }

        uint constant DAY_IN_SECONDS = 86400;
        uint constant YEAR_IN_SECONDS = 31536000;
        uint constant LEAP_YEAR_IN_SECONDS = 31622400;

        uint constant HOUR_IN_SECONDS = 3600;
        uint constant MINUTE_IN_SECONDS = 60;

        uint16 constant ORIGIN_YEAR = 1970;

        function isLeapYear(uint16 year) internal pure returns (bool) {
                if (year % 4 != 0) {
                        return false;
                }
                if (year % 100 != 0) {
                        return true;
                }
                if (year % 400 != 0) {
                        return false;
                }
                return true;
        }

        function leapYearsBefore(uint year) internal pure returns (uint) {
                year -= 1;
                return year / 4 - year / 100 + year / 400;
        }

        function getDaysInMonth(uint8 month, uint16 year) internal pure returns (uint8) {
                if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                        return 31;
                }
                else if (month == 4 || month == 6 || month == 9 || month == 11) {
                        return 30;
                }
                else if (isLeapYear(year)) {
                        return 29;
                }
                else {
                        return 28;
                }
        }

        function parseTimestamp(uint timestamp) internal pure returns (_DateTime memory dt) {
                uint secondsAccountedFor = 0;
                uint buf;
                uint8 i;

                // Year
                dt.year = getYear(timestamp);
                buf = leapYearsBefore(dt.year) - leapYearsBefore(ORIGIN_YEAR);

                secondsAccountedFor += LEAP_YEAR_IN_SECONDS * buf;
                secondsAccountedFor += YEAR_IN_SECONDS * (dt.year - ORIGIN_YEAR - buf);

                // Month
                uint secondsInMonth;
                for (i = 1; i <= 12; i++) {
                        secondsInMonth = DAY_IN_SECONDS * getDaysInMonth(i, dt.year);
                        if (secondsInMonth + secondsAccountedFor > timestamp) {
                                dt.month = i;
                                break;
                        }
                        secondsAccountedFor += secondsInMonth;
                }

                // Day
                for (i = 1; i <= getDaysInMonth(dt.month, dt.year); i++) {
                        if (DAY_IN_SECONDS + secondsAccountedFor > timestamp) {
                                dt.day = i;
                                break;
                        }
                        secondsAccountedFor += DAY_IN_SECONDS;
                }

                // Hour
                dt.hour = getHour(timestamp);

                // Minute
                dt.minute = getMinute(timestamp);

                // Second
                dt.second = getSecond(timestamp);

                // Day of week.
                dt.weekday = getWeekday(timestamp);
        }

        function getYear(uint timestamp) internal pure returns (uint16) {
                uint secondsAccountedFor = 0;
                uint16 year;
                uint numLeapYears;

                // Year
                year = uint16(ORIGIN_YEAR + timestamp / YEAR_IN_SECONDS);
                numLeapYears = leapYearsBefore(year) - leapYearsBefore(ORIGIN_YEAR);

                secondsAccountedFor += LEAP_YEAR_IN_SECONDS * numLeapYears;
                secondsAccountedFor += YEAR_IN_SECONDS * (year - ORIGIN_YEAR - numLeapYears);

                while (secondsAccountedFor > timestamp) {
                        if (isLeapYear(uint16(year - 1))) {
                                secondsAccountedFor -= LEAP_YEAR_IN_SECONDS;
                        }
                        else {
                                secondsAccountedFor -= YEAR_IN_SECONDS;
                        }
                        year -= 1;
                }
                return year;
        }

        function getMonth(uint timestamp) internal pure returns (uint8) {
                return parseTimestamp(timestamp).month;
        }

        function getDay(uint timestamp) internal pure returns (uint8) {
                return parseTimestamp(timestamp).day;
        }

        function getHour(uint timestamp) internal pure returns (uint8) {
                return uint8((timestamp / 60 / 60) % 24);
        }

        function getMinute(uint timestamp) internal pure returns (uint8) {
                return uint8((timestamp / 60) % 60);
        }

        function getSecond(uint timestamp) internal pure returns (uint8) {
                return uint8(timestamp % 60);
        }

        function getWeekday(uint timestamp) internal pure returns (uint8) {
                return uint8((timestamp / DAY_IN_SECONDS + 4) % 7);
        }

        function toTimestamp(uint16 year, uint8 month, uint8 day) internal pure returns (uint timestamp) {
                return toTimestamp(year, month, day, 0, 0, 0);
        }

        function toTimestamp(uint16 year, uint8 month, uint8 day, uint8 hour) internal pure returns (uint timestamp) {
                return toTimestamp(year, month, day, hour, 0, 0);
        }

        function toTimestamp(uint16 year, uint8 month, uint8 day, uint8 hour, uint8 minute) internal pure returns (uint timestamp) {
                return toTimestamp(year, month, day, hour, minute, 0);
        }

        function toTimestamp(uint16 year, uint8 month, uint8 day, uint8 hour, uint8 minute, uint8 second) internal pure returns (uint timestamp) {
                uint16 i;

                // Year
                for (i = ORIGIN_YEAR; i < year; i++) {
                        if (isLeapYear(i)) {
                                timestamp += LEAP_YEAR_IN_SECONDS;
                        }
                        else {
                                timestamp += YEAR_IN_SECONDS;
                        }
                }

                // Month
                uint8[12] memory monthDayCounts;
                monthDayCounts[0] = 31;
                if (isLeapYear(year)) {
                        monthDayCounts[1] = 29;
                }
                else {
                        monthDayCounts[1] = 28;
                }
                monthDayCounts[2] = 31;
                monthDayCounts[3] = 30;
                monthDayCounts[4] = 31;
                monthDayCounts[5] = 30;
                monthDayCounts[6] = 31;
                monthDayCounts[7] = 31;
                monthDayCounts[8] = 30;
                monthDayCounts[9] = 31;
                monthDayCounts[10] = 30;
                monthDayCounts[11] = 31;

                for (i = 1; i < month; i++) {
                        timestamp += DAY_IN_SECONDS * monthDayCounts[i - 1];
                }

                // Day
                timestamp += DAY_IN_SECONDS * (day - 1);

                // Hour
                timestamp += HOUR_IN_SECONDS * (hour);

                // Minute
                timestamp += MINUTE_IN_SECONDS * (minute);

                // Second
                timestamp += second;

                return timestamp;
        }
}                  // 引入 DateTime.sol 取得 uinx 時間轉為年月日的功能

contract initiatePlan {
    
    using SafeMath for uint;
    using DateTime for DateTime._DateTime;
    
/*  參與者: 1. 加入既有方案人 2.平台擁有人(我們) 3. 風險合約發起人   */
    
     
    address	public owner;           // 平台擁有人(我們)位址

/*	address public addrJoiner;    */ 
	

    
 	// 方案結構
	struct Plan {
	    string strPlanName;         // 方案名稱，表示這方案的商品類型
	    bool planStatus;            // 方案目前狀態(false為結束)
	    uint256 planStartTime;
	    uint256 planEndTime;
	    uint256 numPeople;          // 方案目前人數
	    uint256 numRepairedPeople;  // 方案報修成功人數
	    uint256 planPrice;          // 方案賠償金額
	    address addrInitiater;      // 風險合約發起人位址
	    
	}
    Plan public plan;
    // plan [方案名稱] => [方案所有資訊] 
    mapping (string => Plan) internal PlanInfo; // 以string mapping 不能 public
    // plan [發起or加入人位址][發起or加入的第幾個方案] => [方案所有資訊]     
    mapping (address => mapping(uint => Plan)) public PlanInfoForAddress;
    
    
    struct Joiner {                 // 加入既有方案人位址，因為會有多個Joiner，所以用一個struct
	    address addrJoiner;
	    string planNameofJoiner;
	    string comName;             // 商品名稱
	    string comSerNum;           // 商品序號
	    bool ifJoinSuc;             // 是否加入成功
	    bool ifRepairSuc;           // 是否報修成功
	}
	Joiner public joiner;
	// JoinerInfo [加入人位址] [加入人加入的第幾個方案] => [加入該方案的資訊(包含名稱)]
    mapping(address => mapping(uint => Joiner)) public JoinerInfo; 

    mapping (address => uint) public NumOfTimeForAddress;

    event eventNewPlan (address addrInitiater, string strPlanName, uint256 planPrice);
    event eventinActive (string strPlanName, address addrInitiater);	
	event eventActive (string strPlanName, address addrInitiater);
	event eventJoinPlan (address addrJoiner, string strPlanName, string comName, string comSerNum);
    event eventifUnderWriting (address addrJoiner, uint256 numtime);
    event eventRepair (address addrJoiner, uint256 numtime);
    event eventVerifysubject (address addrJoiner);
    event eventAccounting (address addrInitiater, uint256 numtime);
 
    event eventConstructor (address owner);
    
	modifier onlyOwner () {
		require(msg.sender == owner);
		_;
	}
	
	constructor () public {
	    owner = msg.sender; // 後端以代理人帳號部署
	    emit eventConstructor (owner);
	}
	
	// 接收到發起人的方案資訊，後端代理人幫他部署
	function NewPlan (address _addrInitiater, string memory _strPlanName, uint256 _planPrice)  public returns (bool) {
		
	    NumOfTimeForAddress[_addrInitiater] = NumOfTimeForAddress[_addrInitiater].add(1);
		
		PlanInfo[_strPlanName].strPlanName = _strPlanName;
		PlanInfo[_strPlanName].planStatus = true;

		PlanInfo[_strPlanName].planPrice = _planPrice;
		PlanInfo[_strPlanName].numPeople = 0;
		PlanInfo[_strPlanName].numRepairedPeople = 0;
		PlanInfo[_strPlanName].addrInitiater = _addrInitiater;
		
		PlanInfoForAddress[_addrInitiater][NumOfTimeForAddress[_addrInitiater]].strPlanName = _strPlanName;
		PlanInfoForAddress[_addrInitiater][NumOfTimeForAddress[_addrInitiater]].planStatus = true;

		PlanInfoForAddress[_addrInitiater][NumOfTimeForAddress[_addrInitiater]].planPrice = _planPrice;
		PlanInfoForAddress[_addrInitiater][NumOfTimeForAddress[_addrInitiater]].numPeople = 0;
		PlanInfoForAddress[_addrInitiater][NumOfTimeForAddress[_addrInitiater]].numRepairedPeople = 0;
		PlanInfoForAddress[_addrInitiater][NumOfTimeForAddress[_addrInitiater]].addrInitiater = _addrInitiater;
	
		emit eventNewPlan (_addrInitiater, _strPlanName, _planPrice);
		return true;
	}

	// 關閉風險池功能，均傳至後端後由owner執行。
	function inActivePlan (string memory _strPlanName, address _addrInitiater)  public returns (bool) {
	    
	    require (PlanInfo[_strPlanName].planStatus == true);
	    require (PlanInfo[_strPlanName].addrInitiater == _addrInitiater);

		PlanInfo[_strPlanName].planStatus = false;
		PlanInfoForAddress[_addrInitiater][NumOfTimeForAddress[_addrInitiater]].planStatus = false;
		
		emit eventinActive (_strPlanName, _addrInitiater);	
		return true;
	}
	
	// 重啟風險池功能，均傳至後端後由owner執行。
	function ActivePlan (string memory _strPlanName, address _addrInitiater)  public returns (bool) {
	    require (PlanInfo[_strPlanName].planStatus == false);
	    require (PlanInfo[_strPlanName].addrInitiater == _addrInitiater);

		PlanInfo[_strPlanName].planStatus = true;
		PlanInfoForAddress[_addrInitiater][NumOfTimeForAddress[_addrInitiater]].planStatus = true;
		
		emit eventActive (_strPlanName, _addrInitiater);
		
		return true;
	}
	
	//加入方案，成功回傳標的
	function JoinPlan (address _addrJoiner, string memory _strPlanName, string memory _comName, string memory _comSerNum)  public returns (bool) {
	    
	    require (keccak256(abi.encodePacked(_strPlanName)) == keccak256(abi.encodePacked(PlanInfo[_strPlanName].strPlanName))); // keccak256()
	    require (PlanInfo[_strPlanName].planStatus == true);
	    

        NumOfTimeForAddress[_addrJoiner] = NumOfTimeForAddress[_addrJoiner].add(1);
        
        JoinerInfo[_addrJoiner][NumOfTimeForAddress[_addrJoiner]].addrJoiner = _addrJoiner;
        JoinerInfo[_addrJoiner][NumOfTimeForAddress[_addrJoiner]].planNameofJoiner = _strPlanName;
        
        
        JoinerInfo[_addrJoiner][NumOfTimeForAddress[_addrJoiner]].comName = _comName;
        JoinerInfo[_addrJoiner][NumOfTimeForAddress[_addrJoiner]].comSerNum = _comSerNum;
        JoinerInfo[_addrJoiner][NumOfTimeForAddress[_addrJoiner]].ifJoinSuc = true;

	    
	    PlanInfo[_strPlanName].numPeople = PlanInfo[_strPlanName].numPeople.add(1);
	    
	    PlanInfoForAddress[_addrJoiner][NumOfTimeForAddress[_addrJoiner]].numPeople = PlanInfoForAddress[_addrJoiner][NumOfTimeForAddress[_addrJoiner]].numPeople.add(1);
	    
	    PlanInfoForAddress[PlanInfo[_strPlanName].addrInitiater][NumOfTimeForAddress[PlanInfo[_strPlanName].addrInitiater]].numPeople = PlanInfoForAddress[PlanInfo[_strPlanName].addrInitiater][NumOfTimeForAddress[PlanInfo[_strPlanName].addrInitiater]].numPeople.add(1);
	    
	    
	    emit eventJoinPlan (_addrJoiner, _strPlanName, _comName, _comSerNum);
	    
	    return true;
	}
	
	// 核保標的功能，輸入加入者位址及第幾次加入的方案，回傳核保訊息
	function ifUnderWriting (address _addrJoiner, uint256 _numtime) public view returns (string memory) {
	   if (JoinerInfo[_addrJoiner][_numtime].ifJoinSuc == true) {
	       return "Your Commodity is Insurable!, You can use 'JoinerInfo' to check."; // 核保成功
	   } else {
	       return "Your Commodity is NOT Insurable!"; // 核保失敗
	   }
	}
    // 此人報修商品成功功能，結餘算總金額用
    function Repair (address _addrInitiater, address _addrJoiner, uint256 _numtime) public returns (string memory) {
        JoinerInfo[_addrJoiner][_numtime].ifRepairSuc = true;
        PlanInfoForAddress[_addrJoiner][_numtime].numRepairedPeople = PlanInfoForAddress[_addrJoiner][_numtime].numRepairedPeople.add(1);
        PlanInfoForAddress[_addrInitiater][_numtime].numRepairedPeople = PlanInfoForAddress[_addrInitiater][_numtime].numRepairedPeople.add(1);
	    return "Your Commodity is Repaired success!, You can use 'JoinerInfo' to check."; // 報修成功
	}
	
	// 結餘功能，將風險池關閉，並回傳加入方案報修成功人數、該方案賠償金額，計算總金額
	function Accounting (address _addrInitiater, uint256 _numtime) public view returns (uint) {
	   // inActivePlan(_strPlanName, PlanInfo[_strPlanName].addrInitiater); //把方案關閉，結算完再 call(後端)
	    uint256 Amount = PlanInfoForAddress[_addrInitiater][_numtime].numRepairedPeople * PlanInfoForAddress[_addrInitiater][_numtime].planPrice;
	    return Amount;      // 賠償金額乘上報修成功人數
	}
}