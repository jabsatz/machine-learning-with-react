// @flow

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { HOME_PAGE_ROUTE, MACHINE_LEARNING_ROUTE } from '../routes';

const StyledNav = styled.nav``;
const NavList = styled.ul`
	display: flex;
	list-style: none;
`;
const NavListItem = styled.li`
	margin-right: 15px;
`;
const StyledNavLink = styled(NavLink)`
	font-size: 25px;
	text-decoration: none;
	color: black;
	&:hover {
		color: blue;
	}
`;

const Nav = () => (
	<StyledNav>
		<NavList>
			{[
				{ route: HOME_PAGE_ROUTE, label: 'Home' },
				{ route: MACHINE_LEARNING_ROUTE, label: 'Machine Learning' },
			].map(link => (
				<NavListItem key={link.route}>
					<StyledNavLink
						to={link.route}
						activeStyle={{ color: 'limegreen' }}
						exact
					>
						{link.label}
					</StyledNavLink>
				</NavListItem>
			))}
		</NavList>
	</StyledNav>
);

export default Nav;
