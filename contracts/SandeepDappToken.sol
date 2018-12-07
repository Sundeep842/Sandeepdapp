pragma solidity ^0.4.23;
 
/*import "/home/ubuntu/token_sale/contracts/IERC20.sol";
*/
interface  IERC20 {
  function transfer(address _recipient, uint256 _value) public returns (bool success);
}
 
contract SandeepDappToken{
           // constructor

           // set the v ariable
	uint256  public totalSupply;

	string public name = 'Dapp';

	mapping(address => uint256) public balanceOf;
 	constructor(uint256 _initialSupply )  public {
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;
	}	
	function  transfer(address _to, uint256  _value) public returns (bool success)
	{
		require(balanceOf[msg.sender] >= _value);	

	
	}

}

