<!--NAVBARS-->
    <div class="jumbotron jumbotron-main">
      <nav class="navbar navbar-expand-md navbar-dark">
        <a class="navbar-brand" href="#">Brand</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item <?php if ($CURRENT_PAGE == "Index") {?>active<?php }?>"><a class="nav-link" href="index.php">Home</a></li>
            <li class="nav-item <?php if ($CURRENT_PAGE == "About") {?>active<?php }?>"><a class="nav-link" href="about.php">About</a></li>
            <li class="nav-item <?php if ($CURRENT_PAGE == "Services") {?>active<?php }?>"><a class="nav-link" href="services.php">Services</a></li>
            <li class="nav-item <?php if ($CURRENT_PAGE == "Contact") {?>active<?php }?>"><a class="nav-link" href="contact.php">Contact</a></li>
          </ul>
        </div>
      </nav>
      <div class="container">
      	<?php if($CURRENT_PAGE=="Index"):?>
      		<h1>Multipurpose Bootstrap Theme</h1>
	        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content</p>
	        <p><a class="btn btn-primary btn-lg" href="about.php"> Read More</a> <a class="btn btn-default btn-lg" href="contact.php">Contact Us</a></p>
     		<?php elseif($CURRENT_PAGE=="About"):?>
     			<h1>About Us</h1>
      	<?php elseif($CURRENT_PAGE=="Services"):?>
      		<h1>Services</h1>
      	<?php else:?>
      		<h1>Contact Us</h1>
      	<?php endif;?>
      </div>
    </div>