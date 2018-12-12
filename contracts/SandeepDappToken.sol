pragma solidity ^0.4.23;
 
/*import "/home/ubuntu/token_sale/contracts/IERC20.sol";

interface  IERC20 {
  function transfer(address _recipient, uint256 _value) public returns (bool success);
}*/
 
contract SandeepDappToken{
           // constructor

           // set the v ariable
	uint256  public totalSupply;

	string public name = 'Dapp';

	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value	
	);
	event Approval(
		address indexed _owner,
		address indexed _spender,
		uint256 _value
	);
	
	mapping(address => uint256) public balanceOf;
	mapping(address => mapping(address => uint256)) public allowance;
 	function SandeepDappToken (uint256 _initialSupply )  public {
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;
	}	
	function  transfer(address _to, uint256  _value) public returns (bool success)
	{
		require(balanceOf[msg.sender] >= _value);	

		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;
		Transfer(msg.sender, _to, _value);			
	}
	function approve(address _spender,uint256 _value) public returns (bool success)
	{
		//allowance
	//approve event
		allowance[msg.sender][_spender] = _value;	
		Approval(msg.sender, _spender, _value);
	 	return true;		
		}	
	
	function transferFrom(address _from,address _to, uint256 _value) public returns (bool success){
	require(_value <= balanceOf[_from]);
	require(_value <= allowance[_from][msg.sender]);
	Transfer(_from,_to,_value);	
	
	balanceOf[_from] -= _value;
	balanceOf[_to] += _value;
	allowance[_from][msg.sender] -= _value;
	return true;
}
 
}

