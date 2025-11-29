import React from 'react';
import StyledSafeAreaView from "@/src/shared/StyledSafeAreaView";
import StyledText from "@/src/shared/StyledText";
import PageLayout from "@/src/shared/PageLayout";

const WalletPage = () => {
    return (
        <PageLayout
            headerRender={() => <StyledText>wallet</StyledText>}
            bodyRender={() => <StyledText>wallet</StyledText>}
        />
    );
};

export default WalletPage;