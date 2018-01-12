<template>
	<nav class="nav" role="navigation" :class="fixNavigation">
		<div :class="slideNav" class="wrapper">
			<div class="nav__left-side">
				<router-link :to="{ name: 'Home' }">
					<i class="left-side__home-icon fa fa-home fa-2x" aria-hidden="true"></i>
				</router-link>
				<search-bar-component class="left-side__search-bar"></search-bar-component>
			</div>
			<ul class="nav__right-side" @click="hideNav">
				<li class="right-side__menu-item" v-for="menuItem in menuItems" :key="menuItem.index">
					<router-link class="right-side__link" :to="{ name: menuItem }">{{ menuItem }}</router-link>
				</li>
			</ul>
		</div>
		<i class="nav__menu-icon fa fa-bars fa-2x" v-show="menuButton" @click="toggleNav" aria-hidden="true"></i>
		<i class="nav__menu-icon fa fa-times-circle-o fa-2x" v-show="menuButtonClose" @click="toggleNav" aria-hidden="true"></i>
	</nav>
</template>

<script>
import SearchBar from "@/components/Filters/SearchBar";

export default {
	components: {
		"search-bar-component": SearchBar
	},
	data() {
		return {
			menuItems: ["Characters", "Houses", "Cities", "Episodes"],
			fixed: false,
			showNav: false,
			menuButton: true,
			menuButtonClose: false
		};
	},
	computed: {
		fixNavigation() {
			return {
				fixed: this.fixed && window.innerWidth > 768
			};
		},
		slideNav() {
			return {
				"toggle-nav": this.showNav && window.innerWidth < 768
			};
		}
	},
	methods: {
		handleScroll() {
			this.fixed = window.scrollY > window.innerHeight - 70;
		},
		toggleNav() {
			this.showNav = !this.showNav;
			this.menuButton = !this.menuButton;
			this.menuButtonClose = !this.menuButtonClose;
		},
		hideNav() {
			this.showNav = false;
			this.menuButton = !this.menuButton;
			this.menuButtonClose = !this.menuButtonClose;
		}
	},
	created() {
		window.addEventListener("scroll", this.handleScroll);
	},
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/mixins.scss";

.nav {
	line-height: 70px;
	width: 100%;
	position: absolute;
	top: calc(100vh - 70px);

	.wrapper {
		display: flex;
		justify-content: space-between;
		background-color: $black-transparent;
		box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.6);
		
		@include mq(768px) {
			position: fixed;
			top: 0;
			left: -260px;
			flex-direction: column;
			height: 100vh;
			width: 250px;
			transition: 0.4s ease-in-out;
			z-index: 1;
			overflow: scroll;
		}
	}

	.nav__left-side {
		display: flex;
		width: 40%;
	}

	.left-side__home-icon {
		position: absolute;
		top: 20px;
		left: 20px;
		color: $white;
		transition: 0.2s ease-in-out;

		&:hover {
			color: $bisque;
		}

		@include mq(768px) {
			top: 110px;
			border-bottom: $white solid 1px;
			width: 85%;
			text-align: center;
		}
	}

	.left-side__search-bar {
		@include mq(768px) {
			position: absolute;
			left: -70px;
		}
	}

	.nav__right-side {
		width: 50%;
		display: flex;
		justify-content: flex-end;
		list-style: none;

		@include mq(768px) {
			flex-direction: column;
			position: absolute;
			width: 100%;
			top: 170px;
		}
	}

	.right-side__menu-item {
		width: 100%;
		text-align: center;
	}

	.right-side__link {
		display: block;
		text-decoration: none;
		color: $white;
		font-style: italic;
		font-weight: bold;
		transition: 0.2s ease-in-out;

		&:hover {
			background-color: $bisque;
			color: $black-transparent;
		}

		@include mq(768px) {
			&:hover {
				background-color: transparent;
				color: $white;
			}
		}
	}

	.nav__menu-icon {
		display: none;

		@include mq(768px) {
			display: block;
			position: fixed;
			right: 10px;
			top: 10px;
			color: $white;
			padding: 10px;
			border-radius: 5px;
			background-color: $black-transparent;
			box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.6);
			z-index: 10;
			animation-name: change-menu-icon;
			animation-duration: 0.4s;
			animation-fill-mode: forwards;
		}

		@keyframes change-menu-icon {
			from {
				transform: rotateY(0deg);
			}
			to {
				transform: rotateY(180deg);
			}
		}
	}
}

.router-link-exact-active,
.router-link-exact-active i {
	color: $chocolate !important;
}

.toggle-nav {
	transform: translateX(260px);
}

.fixed {
	position: fixed;
	top: 0;
	z-index: 1;
	width: 100%;
	animation-duration: 0.5s;
	animation-name: nav-bounce;
}

@keyframes nav-bounce {
	from {
		transform: scale(1);
	}
	50% {
		transform: scale(1.05);
	}
	to {
		transform: scale(1);
	}
}
</style>