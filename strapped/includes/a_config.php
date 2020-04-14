<?php
	switch ($_SERVER["SCRIPT_NAME"]) {
		case "/portfolios/strapped/about.php":
			$CURRENT_PAGE = "About"; 
			$PAGE_TITLE = "About Us";
			break;
		case "/portfolios/strapped/contact.php":
			$CURRENT_PAGE = "Contact"; 
			$PAGE_TITLE = "Contact Us";
			break;
		case "/portfolios/strapped/services.php":
			$CURRENT_PAGE = "Services"; 
			$PAGE_TITLE = "Services";
			break;
		default:
			$CURRENT_PAGE = "Index";
			$PAGE_TITLE = "Welcome!";
	}
?>