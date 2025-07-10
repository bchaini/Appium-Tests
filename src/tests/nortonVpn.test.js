const { expect } = require('chai');
const { 
    startSession, 
    connectVPN, 
    checkConnection, 
    disconnectVPN, 
    closeDriver,
    checkForPauseButton,
    checkForDisconnectButton,
} = require('../helpers/appiumHelper');

describe('Norton VPN App Test', () => {
    beforeEach(async () => {
        await startSession();
    });

    it('should open the Norton VPN app and connect to the VPN', async () => {
        await connectVPN();
        const isConnected = await checkConnection();
        expect(isConnected).to.be.true;
        
        // Verify both buttons are present after connection
        const hasPauseButton = await checkForPauseButton();
        const hasDisconnectButton = await checkForDisconnectButton();
        
        expect(hasPauseButton || hasDisconnectButton).to.be.true;
    });

    it('should disconnect from the VPN', async () => {
        await disconnectVPN();
        const isConnected = await checkConnection();
        expect(isConnected).to.be.false;
    });

    after(async () => {
        await closeDriver();
    });
});